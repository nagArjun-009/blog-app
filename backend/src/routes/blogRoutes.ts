import { Router } from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  addComment,
  likeBlog,
} from '../controllers/blogController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);
router.post('/:id/comments', authMiddleware, addComment);
router.post('/:id/like', authMiddleware, likeBlog);

export default router;
