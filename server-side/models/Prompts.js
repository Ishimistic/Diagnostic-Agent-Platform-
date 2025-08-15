import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    version: { type: String, default: 'v1' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Prompt', promptSchema);
