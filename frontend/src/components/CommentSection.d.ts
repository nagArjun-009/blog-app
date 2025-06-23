import { type Blog } from '../types';
interface CommentSectionProps {
    blog: Blog;
    onComment: (id: string, content: string) => Promise<void>;
}
declare const CommentSection: ({ blog, onComment }: CommentSectionProps) => import("react/jsx-runtime").JSX.Element;
export default CommentSection;
