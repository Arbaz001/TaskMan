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
        console.log('Profile API response:', res.data);
        // Universal: check for .user or direct
        let userData = res.data && typeof res.data === 'object' ? (res.data.user || res.data) : {};
        // Fallback for missing fields
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      {user.image && <img src={user.image} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />}
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4 mb-8">
        <input className="border rounded px-3 py-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" required />
        <input className="border rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Update Profile</button>
      </form>
      <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
        <input type="password" className="border rounded px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New Password" minLength={6} />
        <button type="submit" className="bg-purple-100 text-purple-700 py-2 rounded hover:bg-purple-200">Update Password</button>
      </form>
    </div>
  );
};

export default Profile; 