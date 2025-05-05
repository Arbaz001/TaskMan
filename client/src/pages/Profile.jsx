import React, { useState, useEffect } from 'react';
import api from '../api';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', image: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/user/me');
        let userData = res.data && typeof res.data === 'object' ? (res.data.user || res.data) : {};
        userData = {
          name: userData.name || '',
          email: userData.email || '',
          image: userData.image || '',
        };
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.put('/user/profile', { name, email });
      setUser({ ...user, name, email });
      setMessage('Profile updated!');
    } catch (err) {
      setError('Profile update failed');
    }
  };
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.put('/user/password', { password });
      setPassword('');
      setMessage('Password updated!');
    } catch (err) {
      setError('Password update failed');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[120px]"><span className="text-gray-500 dark:text-gray-400 animate-pulse">Loading...</span></div>;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded shadow transition-colors duration-300" aria-label="Profile Settings">
      <h1 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">Profile Settings</h1>
      {user.image && <img src={user.image} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />}
      {message && <div className="mb-4 text-green-600 dark:text-green-400">{message}</div>}
      {error && <div className="mb-4 text-red-600 dark:text-red-300">{error}</div>}
      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4 mb-8">
        <input className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-400 dark:focus:ring-purple-800 transition-colors" value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" required aria-label="Full Name" />
        <input className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-400 dark:focus:ring-purple-800 transition-colors" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required aria-label="Email" />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all">Update Profile</button>
      </form>
      <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
        <input type="password" className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 dark:focus:border-purple-400 dark:focus:ring-purple-800 transition-colors" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New Password" minLength={6} aria-label="New Password" />
        <button type="submit" className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-2 rounded hover:bg-purple-200 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all">Update Password</button>
      </form>
    </div>
  );
};

export default Profile; 