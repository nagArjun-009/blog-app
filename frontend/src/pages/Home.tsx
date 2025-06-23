import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container mx-auto py-8 align-center'>
      <h1 className='text-3xl text-center font-bold mb-4 '>
        Welcome to Blog App
      </h1>
      <p className='mb-4 text-center'>
        Explore and share your thoughts with our community!
      </p>
      <div className='text-center'>
        <Link to='/blogs' className='text-blue-500 hover:underline '>
          View Blogs
        </Link>
      </div>
    </div>
  );
};

export default Home;
