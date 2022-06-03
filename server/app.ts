import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './Routes';
import { notFoundError, serverError } from './Middleware';
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3030);
app.use('/api/v1', router);
app.use(notFoundError);
app.use(serverError);
export default app;
