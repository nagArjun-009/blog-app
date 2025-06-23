import { Link } from 'react-router-dom';
import { type Blog } from '../types';
import { useAuth } from '../hooks/useAuth';
// import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}

const BlogCard = ({ blog, onDelete, onLike }: BlogCardProps) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-gray-600'>By {blog.author.username}</p>
        <p className='mt-2'>{blog.content.substring(0, 100)}...</p>
        <div className='mt-4 flex space-x-2'>
          <Link to={`/blogs/${blog._id}`} className='text-blue-500'>
            Read More
          </Link>
          {isAuthenticated && (
            <>
              <Button onClick={() => onLike(blog._id!)}>
                {user?._id && blog.likes.includes(user._id) ? 'Unlike' : 'Like'}
              </Button>
              {blog.author._id === user?._id && (
                <>
                  <Link
                    to={`/blogs/edit/${blog._id}`}
                    className='text-blue-500'
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => onDelete(blog._id!)}
                    variant='destructive'
                  >
                    Delete
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
