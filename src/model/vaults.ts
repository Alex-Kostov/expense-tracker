import mongoose from 'mongoose'
import { Schema, Types } from 'mongoose';
// TODO: Both imports should be with one line.

export interface VaultImpl {
  name: string;
  type: string;
  currency: Types.ObjectId;
}

const vaultSchema = new Schema<VaultImpl>({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  currency: [{ type: Schema.Types.ObjectId, ref: 'Currency' }]
});

export default mongoose.model<VaultImpl>('Vault', vaultSchema);
