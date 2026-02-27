import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema(
  {
    from: {
      name: { type: String, default: '' },
      address: { type: String, required: true }
    },
    to: { type: String, required: true },
    subject: { type: String, default: '(No Subject)' },
    body: {
      html: { type: String, default: '' },
      text: { type: String, default: '' },
      snippet: { type: String, default: '' }
    },
    folder: {
      type: String,
      enum: ['inbox', 'sent', 'trash'],
      default: 'inbox'
    },
    isRead: { type: Boolean, default: false },
    resendId: { type: String, unique: true, sparse: true }
  },
  {
    timestamps: true
  }
);

export const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);
