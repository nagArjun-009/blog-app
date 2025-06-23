import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CommentSection from '../components/CommentSection';
import {type Blog } from '../types';

const fetchBlog = async (id: string): Promise<Blog> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
  return res.json();
};

const addComment = async (id: string, content: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/blogs/${id}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ content }),
    }
  );
  return res.json();
};

const BlogDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlog(id!),
  });

  const commentMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      addComment(id, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog', id] }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
      <p className='text-gray-600'>By {blog.author.username}</p>
      <p className='mt-4'>{blog.content}</p>
      <CommentSection
        blog={blog}
        onComment={async (id, content) => {
          await commentMutation.mutateAsync({ id, content });
        }}
      />
    </div>
  );
};

export default BlogDetail;
