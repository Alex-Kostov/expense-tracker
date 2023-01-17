import express from 'express';
import subscribersRouter from './routes/subscribers';
require('./db/mongoose');

const app = express();

app.use(express.json());

app.use('/subscribers', subscribersRouter);

export default app;