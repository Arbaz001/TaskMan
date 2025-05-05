import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, CheckCircle, User } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar w-64 h-screen bg-white dark:bg-gray-950 border-r border-purple-100 dark:border-gray-800 shadow-lg flex flex-col py-6 px-4 transition-colors duration-300 justify-between" aria-label="Sidebar Navigation">
      <div>
        <div className="mb-10">
          <span className="text-3xl font-bold text-purple-700 dark:text-purple-300 drop-shadow-md">TaskMan</span>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Main">
          <NavLink to="/" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${isActive ? 'bg-purple-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}> <Home size={22}/> Dashboard </NavLink>
          <NavLink to="/pending" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${isActive ? 'bg-purple-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}> <List size={22}/> Pending Tasks </NavLink>
          <NavLink to="/complete" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${isActive ? 'bg-purple-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}> <CheckCircle size={22}/> Completed Tasks </NavLink>
          <NavLink to="/profile" className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${isActive ? 'bg-purple-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}> <User size={22}/> Profile </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 