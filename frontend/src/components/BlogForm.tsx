import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {type  Blog } from '../types';

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (data: Partial<Blog>) => Promise<void>;
}

const BlogForm = ({ initialData, onSubmit }: BlogFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => navigate('/blogs'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>
        {initialData ? 'Edit Blog' : 'Create Blog'}
      </h2>
      <div className='space-y-4'>
        <Input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full'
        />
        <Textarea
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full'
        />
        <Button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default BlogForm;
