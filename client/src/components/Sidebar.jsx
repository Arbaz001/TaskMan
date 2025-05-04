import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, List, CheckCircle, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <aside className="sidebar w-64 min-h-screen bg-white border-r border-purple-100 shadow-lg flex flex-col py-6 px-4">
      <div className="mb-10">
        <span className="text-3xl font-bold text-purple-700 drop-shadow-md">TaskMan</span>
      </div>
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'}`}> <Home size={22}/> Dashboard </NavLink>
        <NavLink to="/pending" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'}`}> <List size={22}/> Pending Tasks </NavLink>
        <NavLink to="/complete" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'}`}> <CheckCircle size={22}/> Completed Tasks </NavLink>
        <NavLink to="/profile" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'}`}> <User size={22}/> Profile </NavLink>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-700 text-red-600 mt-auto transition-all duration-200 font-semibold"> <LogOut size={22}/> Logout </button>
      </nav>
    </aside>
  );
};

export default Sidebar; 