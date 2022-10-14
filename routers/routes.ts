import {Router} from 'express';
import {updateDataBaseRouter} from "./updateDataBaseRouter";
import {listOfMoviesRouter} from "./listOfMoviesRouter";
import {config} from "../config/config";

export const routes = Router();

routes.use(`${config.serverToApiUrlPrefix}/send-movies-to-database`, updateDataBaseRouter);
routes.use(`${config.serverToApiUrlPrefix}/`, listOfMoviesRouter);