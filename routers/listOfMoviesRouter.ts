import {Router} from 'express';
import {MovieResponseToFront} from "../records/movieResponseToFront.record";
import {TopMovie} from "../records/topMovies.record";
import {dbQueryGenerator} from "../utils/dbQueryGenerator";

export const listOfMoviesRouter = Router();

listOfMoviesRouter
    .get('/get-list', async  (req, res)=>{
        res.json(await TopMovie.getGenresList());
    })
  .post('/get-number', async  (req, res)=>{
      const {genre, rating, startYear, endYear} = req.body;

      res.json(await dbQueryGenerator({genre, rating, startYear, endYear}));
  })
    .post('/get-list', async (req, res) => {
        const {number, genre, startYear, endYear, rating} = req.body;

        const movieFromMyDB = await MovieResponseToFront.getMoviesFromDataBaseAndShuffle(Number(number), genre, Number(startYear), Number(endYear), rating);

        res.status(200).json(movieFromMyDB);
    })