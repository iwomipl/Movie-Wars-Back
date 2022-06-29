import {Router} from 'express';

export const updateDataBaseRouter = Router();

updateDataBaseRouter
    .post('/', async (req, res) => {
        const {position, title, movieNumber, year}  = req.query ;


    })