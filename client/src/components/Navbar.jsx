import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Settings, Zap } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <header className='sticky top-0 z-50 bg-glass shadow-md border-b border-purple-100 font-sans'>
        <div className='flex items-center justify-between px-6 py-3 max-w-7xl mx-auto'>
            {/*logo*/}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={()=> navigate('/')}>                
                <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
                    <Zap className='w-7 h-7 text-white'/>
                </div>
                <span className="text-3xl font-extrabold bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide drop-shadow-md">
                    TaskMan
                </span>
            </div>
            {/*RIGHT SIDE*/}
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 hover:bg-purple-50 rounded-full" onClick={()=>navigate('/profile')}>
                     <Settings className='w-6 h-6'/>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Navbar