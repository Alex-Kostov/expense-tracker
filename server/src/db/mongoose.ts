import mongoose from 'mongoose';
import { config } from '../config';

mongoose.set('strictQuery', false);

mongoose
  .connect(config.databaseUrl)
  .then(() => console.log('Connected to Database'))
  .catch((err) => {
    console.log(err);
  });
