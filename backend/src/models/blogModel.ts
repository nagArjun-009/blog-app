import mongoose, { Schema } from 'mongoose';
import { Blog } from '../types';

const blogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [
    {
      user: String,
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Blog>('Blog', blogSchema);
