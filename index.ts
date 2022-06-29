import express, {json, urlencoded} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {config} from "./config/config";
import {routes} from "./routers/routes";

const app = express();

app.use(cors({
    origin: ['http://localhost:3001'],
}));
app.use(json());
app.use(urlencoded({
    extended: true,
}));

//Routers
app.use(routes)

app.listen(config.servPort, config.servHost, ()=>{
    console.log(`Listening on http://${config.servHost}:${config.servPort}`);
})
