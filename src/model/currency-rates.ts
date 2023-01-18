import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface CurrencyImpl {
  code: String;
  rate: Number;
}

const currencySchema = new Schema<CurrencyImpl>({
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    validate(value: string) {
      if (value.length !== 6) {
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
