import express from 'express';
import subscribersRouter from './routes/transactions';
require('./db/mongoose');

const app = express();

app.use(express.json());

app.use('/subscribers', subscribersRouter);

export default app;
