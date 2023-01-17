import mongoose from 'mongoose';
import { config } from '../config';

mongoose.set("strictQuery", false);

mongoose.connect(config.databaseUrl);

const db = mongoose.connection

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));
