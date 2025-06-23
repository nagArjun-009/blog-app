export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
}

export interface Blog {
  _id?: string;
  title: string;
  content: string;
  author: { _id: string; username: string };
  comments: { user: string; content: string; createdAt: string }[];
  likes: string[];
  createdAt: string;
}
