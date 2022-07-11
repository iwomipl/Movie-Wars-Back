import {Router} from 'express';
import {updateDataBaseRouter} from "./updateDataBaseRouter";
import {listOfMoviesRouter} from "./listOfMoviesRouter";

export const routes = Router();

routes.use('/send-movies-to-database', updateDataBaseRouter);
routes.use('/get-list', listOfMoviesRouter);