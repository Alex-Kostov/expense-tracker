import mongoose, { Schema, Types } from 'mongoose';

export interface ITransaction {
	amount: number;
	description?: string;
	transactionType: string;
	category: string;
	vault?: Types.ObjectId;
	date: Date;
}

const transactionSchema = new Schema<ITransaction>({
	amount: {
		type: Number,
		required: true,
		immutable: true,
		min: [0, 'Amount must be positive number'],
	},
	description: {
		type: String,
		trim: true,
	},
	transactionType: {
		type: String,
		required: true,
		enum: ['income', 'expense'],
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	vault: {
		type: Schema.Types.ObjectId,
		ref: 'Vault',
	},
	date: {
		type: Date,
		required: true,
	},
});

export default mongoose.model<ITransaction>(
	'Transaction',
	transactionSchema
);
