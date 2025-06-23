import { type Blog } from '../types';
interface BlogCardProps {
    blog: Blog;
    onDelete: (id: string) => void;
    onLike: (id: string) => void;
}
declare const BlogCard: ({ blog, onDelete, onLike }: BlogCardProps) => import("react/jsx-runtime").JSX.Element;
export default BlogCard;
