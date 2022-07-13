import express, {urlencoded} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {config} from "./config/config";
import {routes} from "./routers/routes";
import { handleError, handleFourOhFourError } from './utils/errors';

const app = express();

app.use(cors({
    origin: [config.corsOrigin],
}));
app.use(express.json());
app.use(urlencoded({
    extended: true,
}));

//Routers
app.use(routes);

//errors
app.use(handleError);
//404 error
app.use(handleFourOhFourError);

app.listen(config.servPort, config.servHost, ()=>{
    console.log(`Listening on http://${config.servHost}:${config.servPort}`);
})
