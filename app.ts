import express from 'express';
require('./db/mongoose');
import subscribersRouter from './routes/subscribers';

const app = express();

app.use(express.json());

app.use('/subscribers', subscribersRouter);

export default app;