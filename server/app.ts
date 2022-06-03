import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './Routes/index';
import booksRouter from './Routes/BooksRouter';
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3030);
app.use('/api/v1', router);
app.use('/api/v1', booksRouter);

export default app;
