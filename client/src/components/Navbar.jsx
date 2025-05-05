import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Settings, Zap, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 shadow-md border-b border-purple-100 dark:border-gray-800 font-sans backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center justify-between w-full px-2 py-3">
            {/*logo*/}
            <button aria-label="Go to dashboard" className="flex items-center gap-3 group focus:outline-none" onClick={()=> navigate('/')}>                
                <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
                    <Zap className='w-7 h-7 text-white'/>
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide drop-shadow-md">
                    TaskMan
                </span>
            </button>
            {/*RIGHT SIDE*/}
            <div className="flex items-center gap-2 sm:gap-4">
                <button aria-label="Profile settings" className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400" onClick={()=>navigate('/profile')}>
                     <Settings className='w-6 h-6'/>
                </button>
                <button aria-label="Logout" className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300 hover:bg-red-50 dark:hover:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400" onClick={handleLogout}>
                     <LogOut className='w-6 h-6'/>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Navbar