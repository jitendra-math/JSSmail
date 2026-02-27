import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    html: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);
