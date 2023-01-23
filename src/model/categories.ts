import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface CategoryImpl {
  name: String;
}

const categorySchema = new Schema<CategoryImpl>({ name: String });

export default mongoose.model<CategoryImpl>('Category', categorySchema);
