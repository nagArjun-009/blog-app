import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {type Blog } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CommentSectionProps {
  blog: Blog;
  onComment: (id: string, content: string) => Promise<void>;
}

const CommentSection = ({ blog, onComment }: CommentSectionProps) => {
  const [comment, setComment] = useState('');
  const { isAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: () => onComment(blog._id!, comment),
    onSuccess: () => setComment(''),
  });

  return (
    <div className='mt-4'>
      <h3 className='text-lg font-bold'>Comments</h3>
      {blog.comments.map((c, index) => (
        <div key={index} className='border-b py-2'>
          <p className='font-semibold'>{c.user}</p>
          <p>{c.content}</p>
          <p className='text-sm text-gray-500'>
            {new Date(c.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
      {isAuthenticated && (
        <div className='mt-4 flex space-x-2'>
          <Input
            type='text'
            placeholder='Add a comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Posting...' : 'Post'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
