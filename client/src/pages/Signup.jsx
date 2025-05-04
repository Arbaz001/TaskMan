import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/user/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-gray-500 text-center mb-6">Join TaskMan to manage your tasks</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" className="border rounded px-3 py-2" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input type="email" className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" className="border rounded px-3 py-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 