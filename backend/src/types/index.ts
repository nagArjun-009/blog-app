import mongoose from 'mongoose';

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
}

export interface Blog {
  _id?: string;
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId | string;
  comments: { user: string; content: string; createdAt: Date }[];
  likes: string[];
  createdAt: Date;
}
