import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-lg font-bold'>
          Blog App
        </Link>
        <div className='space-x-4'>
          <Link to='/' className='text-white hover:text-gray-300'>
            Home
          </Link>
          <Link to='/blogs' className='text-white hover:text-gray-300'>
            Blogs
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to='/login' className='text-white hover:text-gray-300'>
                Login
              </Link>
              <Link to='/register' className='text-white hover:text-gray-300'>
                Register
              </Link>
            </>
          ) : (
            <Button onClick={handleLogout} className='text-white'>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
