import { Request, Response } from 'express';
import Blog from '../models/blogModel';
import { Blog as BlogType } from '../types';

interface AuthRequest extends Request {
  user?: { _id: string; username: string; email: string };
}

export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user?._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog', error });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching blogs', error });
  }
};

export const getBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      'author',
      'username'
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching blog', error });
  }
};

export const updateBlog = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user?._id)
      return res.status(403).json({ message: 'Unauthorized' });

    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog', error });
  }
};

export const deleteBlog = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user?._id)
      return res.status(403).json({ message: 'Unauthorized' });

    await blog.deleteOne();
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting blog', error });
  }
};

export const addComment = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({
      user: req.user?.username || '',
      content,
      createdAt: new Date(),
    });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error });
  }
};

export const likeBlog = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const userId = req.user?._id;
    if (blog.likes.includes(userId!)) {
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      blog.likes.push(userId!);
    }
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error liking blog', error });
  }
};

export const unLikeBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const userId = req.user?._id;
    blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error unliking blog', error });
  }
};
