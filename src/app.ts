import express from 'express';
import currenciesRouter from './routes/currencies';
import vaultsRouter from './routes/vaults';

require('./db/mongoose');

const app = express();

app.use(express.json());

app.use('/api/v1/currencies', currenciesRouter);
app.use('/api/v1/vaults', vaultsRouter);

export default app;
