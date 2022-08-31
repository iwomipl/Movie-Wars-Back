import {Router} from 'express';
import {MovieResponseToFront} from "../records/movieResponseToFront.record";
import {TopMovie} from "../records/topMovies.record";

export const listOfMoviesRouter = Router();

listOfMoviesRouter
    .get('/', async  (req, res)=>{
        res.json(await TopMovie.getGenresList());
    })
    .post('/', async (req, res) => {
        const {number} = req.body;
        const movieFromMyDB = await MovieResponseToFront.getMoviesFromDataBaseAndShuffle(number);

        res.status(200).json(movieFromMyDB);
    })