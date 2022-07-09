import {Router} from 'express';
import {MovieResponseToFront} from "../records/movieResponseToFront.record";

export const listOfMoviesRouter = Router();

listOfMoviesRouter
    .post('/', async (req, res) => {
        const {number} = req.body;
        const movieFromMyDB = await MovieResponseToFront.getMoviesFromDataBaseAndShuffle(number);

        res.status(200).json(movieFromMyDB);
    })