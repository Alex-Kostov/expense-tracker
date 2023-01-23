import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';
// TODO: Both imports should be with one line.

export interface CurrencyImpl {
  code: String;
  rate: Number;
  _id?: Types.ObjectId;
  __v?: number;
}

const currencySchema = new Schema<CurrencyImpl>({
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    validate(value: string) {
      if (value.length !== 3) {
        throw new Error('Currency code must be 3 characters long');
      }
    },
  },
  rate: {
    type: Number,
    required: true,
    trim: true,
  },
});

export default mongoose.model<CurrencyImpl>('Currency', currencySchema);
