import { Suspense, lazy } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BlogCard from '../components/BlogCard';
import { type Blog } from '../types';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// const Navbar = lazy(() => import('../components/Navbar'));

const BlogForm = lazy(() => import('../components/BlogForm'));

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Fetches the list of blogs from the API.
 * @returns A promise that resolves to a list of blogs.
 */
/*******  77859342-50d2-454a-a145-4c5513611c15  *******/const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);
  return res.json();
};

const createBlog = async (data: Partial<Blog>) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const deleteBlog = async (id: string) => {
  await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

const likeBlog = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return res.json();
};

const Blogs = () => {
  const queryClient = useQueryClient();
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });

  const likeMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Blogs</h1>
      <Link to='/blogs/create' className='mb-4 inline-block'>
        <Button>Create Blog</Button>
      </Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        blogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onDelete={() => deleteMutation.mutate(blog._id!)}
            onLike={() => likeMutation.mutate(blog._id!)}
          />
        ))
      )}
    </div>
  );
};

export default Blogs;
