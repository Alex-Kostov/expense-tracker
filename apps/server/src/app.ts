import express from 'express';
import cors from 'cors';
import currenciesRouter from './routes/currencies';
import vaultsRouter from './routes/vaults';
import transactionsRouter from './routes/transactions';

require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/currencies', currenciesRouter);
app.use('/api/v1/vaults', vaultsRouter);
app.use('/api/v1/transactions', transactionsRouter)

export default app;
