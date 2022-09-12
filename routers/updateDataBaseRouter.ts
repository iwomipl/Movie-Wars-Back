import {Router} from 'express';
import {topMoviesFromFile} from "../utils/topMoviesFromFile";
import {fetchFunction} from "../utils/fetchFunction";
import {MoviesFromOMDBAPI, NotAddedMovie, TopMoviesInterface} from "../types";
import {TopMovie} from "../records/topMovies.record";
import {addUnsuccessfulMovieAddingToFIle} from "../utils/update-functions-utils";

export const updateDataBaseRouter = Router();

updateDataBaseRouter
  /** ------------updating movies list with a Browser snippet -------*/
    .post('/', async (req, res) => {
      const topMovies: TopMoviesInterface[] = req.body;

      /**---------- map the list of movies ------------*/
      await Promise.all(topMovies.map(async (movie) => {
          const {position, origTitle, polTitle, year, imgOfMovie} = movie;
          /**---------- check if movie is in my DB ------------*/
          const movieFromDB = year && (origTitle || polTitle) ? await TopMovie.checkIfItIsInDataBase(new Date(year), origTitle, polTitle): null;
          /**---------- if it is, update only the position  ------------*/
          if(movieFromDB){
                return movieFromDB.position !== Number(position) ?
                  await TopMovie.updateMoviePosition(movieFromDB.id, Number(position), movieFromDB.origTitle) :
                  origTitle;
          } else {

              /**---------- if movie is not in DB fetch movie data from OMDB API ------------*/
          let movieFromOMDB = (await fetchFunction('GET', `${encodeURIComponent(movie.origTitle || movie.polTitle)}`, `${movie.year}`) as unknown as MoviesFromOMDBAPI);

          /**---------- if movie is in OMDB DB ------------*/
          if (movieFromOMDB !== null) {
              const {
                  Title: title, //lacking of title usage from this source, I'm going to use it to check if data from OMDBAPI is correct
                  Rated: rated,
                  Genre: genre,
                  Director: director,
                  Actors: actors,
                  Plot: plot,
                  Poster: poster
              } = movieFromOMDB;

              /**---------- create instance of TomMovie class ------------*/
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

              /**---------- and save this instance on my DB and return the title or undefined if it is not saved ------------*/
              return await newMovie.addNewMovieToDataBase() as string | undefined;
          }

              /**---------- if above could not be returned add this movie to list of unsuccessful addings ------------*/
              await addUnsuccessfulMovieAddingToFIle({
                  origTitle: movie.origTitle,
                  polTitle: movie.polTitle,
              } as NotAddedMovie);
          return;
          }
      }
      ));
        /**---------- after mapping set and store the list with names and number of occurrences of genres in the list ------------*/
        await TopMovie.setGenresList();

  })
  /** ------------updating movies list from file topMoviesFromFile-------*/
  /** ------------NOT TO BE USED-------*/
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

              await addUnsuccessfulMovieAddingToFIle({
                  origTitle: movie.origTitle,
                  polTitle: movie.polTitle,
              } as NotAddedMovie);
          }, Math.random() * 15000);
      }))

      res.status(200).json({
          message: `Finished`,
      });
  });