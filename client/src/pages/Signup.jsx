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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-2 text-center text-purple-800 dark:text-purple-300">Create Account</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Join TaskMan to manage your tasks</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-400 dark:focus:ring-purple-800 transition-colors" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required aria-label="Full Name" />
          <input type="email" className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-400 dark:focus:ring-purple-800 transition-colors" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required aria-label="Email" />
          <input type="password" className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-400 dark:focus:ring-purple-800 transition-colors" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} aria-label="Password" />
          {error && <div className="text-red-500 dark:text-red-300 text-sm">{error}</div>}
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 