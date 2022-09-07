import {Router} from 'express';
import {topMoviesFromFile} from "../utils/topMoviesFromFile";
import {fetchFunction} from "../utils/fetchFunction";
import {MoviesFromOMDBAPI, TopMoviesInterface} from "../types";
import {TopMovie} from "../records/topMovies.record";
import {appendFile} from "fs/promises";

export const updateDataBaseRouter = Router();

updateDataBaseRouter
    .get('/updateMovies', async (req, res) => {
        await Promise.all(topMoviesFromFile.map(async (movie) => {
            await setTimeout(async () => {
                const {position, origTitle, polTitle, year, imgOfMovie} = movie;
                let movieFromOMDB = await fetchFunction('GET', `${encodeURIComponent(movie.origTitle || movie.polTitle)}`, `${movie.year}`) as unknown as MoviesFromOMDBAPI;

                // movieFromOMDB = movieFromOMDB !== null ? movieFromOMDB : await fetchFunction('GET', `${encodeURIComponent(movie.polTitle)}`, `${movie.year}`) as unknown as MoviesFromOMDBAPI;

                if (movieFromOMDB !== null ) {
                    const {
                        Title: title, //lacking of title usage from this source, I'm going to use it to check if data from OMDBAPI is correct
                        Rated: rated,
                        Genre: genre,
                        Director: director,
                        Actors: actors,
                        Plot: plot,
                        Poster: poster
                    } = movieFromOMDB;

                    const newMovie = new TopMovie({
                        rated,
                        genre,
                        director,
                        actors,
                        plot,
                        poster,
                        position: Number(position),
                        origTitle: origTitle || polTitle,
                        polTitle: polTitle || origTitle,
                        year: new Date(year),
                        imgOfMovie,
                    })

                    return await newMovie.addNewMovieToDataBase();
                }

            await appendFile(__dirname+'/../utils/badMovies.txt',
                `could not add movie:\n
                ${(movie.origTitle || 'no orig title')}\n\n 
                Polish title: \n
                ${movie.polTitle || 'nie ma polskiego tytułu'}\n
            ******-----------------------******\n\n`, 'utf-8')
            }, Math.random() * 15000);
        }))

        res.status(200).json({
            message: `Finished`,
        });
    })
    .post('/', async (req, res) => {
      const topMovies: TopMoviesInterface[] = req.body;
      await Promise.all(topMovies.map(async (movie) => {
          const {position, origTitle, polTitle, year, imgOfMovie} = movie;
          const movieFromDB = year && (origTitle || polTitle) ? await TopMovie.checkIfItIsInDataBase(new Date(year), origTitle, polTitle): null;
          if(movieFromDB){
                return movieFromDB.position !== Number(position) ?
                  await TopMovie.updateMoviePosition(movieFromDB.id, Number(position), movieFromDB.origTitle) :
                  origTitle;
          } else {


          let movieFromOMDB = (await fetchFunction('GET', `${encodeURIComponent(movie.origTitle || movie.polTitle)}`, `${movie.year}`) as unknown as MoviesFromOMDBAPI);

          // movieFromOMDB = movieFromOMDB !== null ? movieFromOMDB : await fetchFunction('GET', `${encodeURIComponent(movie.polTitle)}`, `${movie.year}`) as unknown as MoviesFromOMDBAPI;
          if (movieFromOMDB !== null) {
              const {
                  Title: title, //lacking of title usage from this source, I'm going to use it to check if data from OMDBAPI is correct
                  Rated: rated, Genre: genre, Director: director, Actors: actors, Plot: plot, Poster: poster
              } = movieFromOMDB;

              const newMovie = new TopMovie({
                  rated,
                  genre,
                  director,
                  actors,
                  plot,
                  poster,
                  position: Number(position),
                  origTitle: origTitle || polTitle,
                  polTitle: polTitle || origTitle,
                  year: new Date(year),
                  imgOfMovie,
              });

              return await newMovie.addNewMovieToDataBase() as string | undefined;
          }

          await appendFile(__dirname + '/../utils/badMovies.txt',
            `could not add movie:\n
                ${(movie.origTitle || 'no orig title')}\n\n
                Polish title: \n
                ${movie.polTitle || 'nie ma polskiego tytułu'}\n
            ******-----------------------******\n\n`, 'utf-8');
          return;
          }
      }));
        await TopMovie.setGenresList();

  })