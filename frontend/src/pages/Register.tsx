import { useState } from 'react';
// riages: 0e5f3q6p-7w9t-4u0v-x0f7-t9u1v8s7c9c
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const register = async (data: { username: string; email: string; password: string }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate('/login'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, email, password });
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="space-y-4">
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </div>
  );
};

export default Register;