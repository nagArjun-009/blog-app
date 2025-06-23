import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import { store } from './store';

import type { Blog } from './types';

const Home = lazy(() => import('./pages/Home'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const BlogForm = lazy(() => import('./components/BlogForm'));

const queryClient = new QueryClient();

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

const updateBlog = async (data: Partial<Blog>) => {
  const id = data._id as string;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/:id' element={<BlogDetail />} />
              <Route
                path='/blogs/create'
                element={<BlogForm onSubmit={createBlog} />}
              />
              <Route
                path='/blogs/edit/:id'
                element={<BlogForm onSubmit={updateBlog} />}
              />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
