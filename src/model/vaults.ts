import mongoose from 'mongoose'
const { Schema } = mongoose;

export interface VaultImpl {
  name: String;
  type: String;
  currency?: String; // TODO: To be updated.,
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
