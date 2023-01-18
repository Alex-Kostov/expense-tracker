import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface TransactionImpl {
  amount: Number;
  currency: String;
  transactionType: String;
  category: String;
  vault: String;
  date: Date;
}

const transactionSchema = new Schema<TransactionImpl>({
  amount: {
    type: Number,
    required: true,
    immutable: true,
    min: [0, 'Amount must be positive number'],
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: 'currency',
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  vault: {
    type: Schema.Types.ObjectId,
    ref: 'vault',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<TransactionImpl>(
  'Transaction',
  transactionSchema
);
