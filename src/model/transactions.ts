import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';
// TODO: Both imports should be with one line.

export interface TransactionImpl {
  amount: number;
  currency: Types.ObjectId
  transactionType: string;
  category: Types.ObjectId
  vault: Types.ObjectId
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
    ref: 'Currency',
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  vault: {
    type: Schema.Types.ObjectId,
    ref: 'Vault',
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
