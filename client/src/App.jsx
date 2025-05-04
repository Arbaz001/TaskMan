import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PendingTasks from './pages/PendingTasks'
import CompletedTasks from './pages/CompletedTasks'
import Profile from './pages/Profile'
import TaskForm from './pages/TaskForm'

const App = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className="flex">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pending" element={<PendingTasks />} />
            <Route path="/complete" element={<CompletedTasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/taskform" element={<TaskForm />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App