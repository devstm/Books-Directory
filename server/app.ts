import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './Routes/index';
dotenv.config();

const app: Express = express();
app.set('port', process.env.PORT || 3030);
app.use('/api/v1', router);

export default app;
