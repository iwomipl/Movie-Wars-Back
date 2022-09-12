import {Router} from 'express';
import {topMoviesFromFile} from "../utils/topMoviesFromFile";
import {TopMoviesInterface} from "../types";
import {TopMovie} from "../records/topMovies.record";
import {updateMoviesListInDb} from "../utils/update-functions-utils";

export const updateDataBaseRouter = Router();

updateDataBaseRouter
  /** ------------updating movies list with a Browser snippet -------*/
    .post('/', async (req, res) => {
      const topMovies: TopMoviesInterface[] = req.body;

      /**---------- map and save the list of movies ------------*/
      await updateMoviesListInDb(topMovies);
      /**---------- after mapping set and store the list with names and number of occurrences of genres in the list ------------*/
       await TopMovie.setGenresList();

  })
  /** ------------updating movies list from file topMoviesFromFile-------*/
  .get('/updateMovies', async (req, res) => {

      /**---------- map and save the list of movies ------------*/
      await updateMoviesListInDb(topMoviesFromFile);
      /**---------- after mapping set and store the list with names and number of occurrences of genres in the list ------------*/
      await TopMovie.setGenresList();

      res.status(200).json({
          message: `Finished`,
      });
  });