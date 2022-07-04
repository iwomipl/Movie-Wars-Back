import {Router} from 'express';
import {topMovies} from "../utils/topMovies";

export const listOfMoviesRouter = Router();

listOfMoviesRouter
    .post('/', async (req, res) => {
        const {number} = req.body;
        const arrayOfChosenNumberOfMovies = topMovies.filter(movie => movie.position <= number);
        const shuffledArray = arrayOfChosenNumberOfMovies.sort(()=> Math.random() - 0.5);

        res.status(200).json(shuffledArray);
    })