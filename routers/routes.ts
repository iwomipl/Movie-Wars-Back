import {Router} from 'express';
import {updateDataBaseRouter} from "./updateDataBaseRouter";

export const routes = Router();

routes.use('/send-movies-to-database', updateDataBaseRouter);