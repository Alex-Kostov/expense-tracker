import mongoose, {Schema, Types} from 'mongoose';

export interface IVault {
    name: string;
    balance: number;
    type: string;
    currency: Types.ObjectId;
    _id?: Types.ObjectId;
    __v?: number;
}

const vaultSchema = new Schema<IVault>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    balance: {
        type: Number,
        required: true,
        min: [0, 'You need to have some money in order to create vault :)']
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    currency: {type: Schema.Types.ObjectId, ref: 'Currency'},
});

export default mongoose.model<IVault>('Vault', vaultSchema);
