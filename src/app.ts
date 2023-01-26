import express from 'express';
import currenciesRouter from './routes/currencies';

require('./db/mongoose');

const app = express();

app.use(express.json());

app.use('/api/v1/currencies', currenciesRouter);

export default app;
