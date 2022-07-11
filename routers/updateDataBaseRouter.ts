import {Router} from 'express';
import {topMovies} from "../utils/topMovies";
import {fetchFunction} from "../utils/fetchFunction";
import {MoviesFromOMDBAPI} from "../types";
import {TopMovie} from "../records/topMovies.record";
import {appendFile} from "fs/promises";

export const updateDataBaseRouter = Router();

updateDataBaseRouter
    .get('/updateMovies', async (req, res) => {
        const data = await Promise.all(topMovies.map(async (movie) => {
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