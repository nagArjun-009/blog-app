import { type Blog } from '../types';
interface BlogFormProps {
    initialData?: Blog;
    onSubmit: (data: Partial<Blog>) => Promise<void>;
}
declare const BlogForm: ({ initialData, onSubmit }: BlogFormProps) => import("react/jsx-runtime").JSX.Element;
export default BlogForm;
