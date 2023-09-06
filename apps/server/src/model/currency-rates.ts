import mongoose, { Schema, Types } from 'mongoose';

export interface ICurrency {
	code: string;
	rate: number;
	_id?: Types.ObjectId;
	__v?: number;
}

const currencySchema = new Schema<ICurrency>({
	code: {
		type: String,
		required: true,
		trim: true,
		uppercase: true,
		validate(value: string) {
			if (value.length !== 3) {
				throw new Error('Currency code must be 3 characters long');
			}
		}
	},
	rate: {
		type: Number,
		required: true,
		trim: true
	}
});

export default mongoose.model<ICurrency>('Currency', currencySchema);
