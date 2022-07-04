import {Router} from 'express';
import {topMovies} from "../utils/topMovies";

export const updateDataBaseRouter = Router();

updateDataBaseRouter
    .post('/updateMovies', async (req, res) => {
        const number = req.body.number;
        const arrayOfChosenNumberOfMovies = topMovies.filter(movie => movie.position <= number);

        res.status(200).json(arrayOfChosenNumberOfMovies);
    })