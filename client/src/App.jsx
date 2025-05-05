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
import { ThemeProvider, useTheme } from './components/ThemeContext';
import DarkModeToggle from './components/DarkModeToggle';

const AppContent = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {!hideNavbar && <Navbar />}
      <div className="flex">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 p-6 min-h-screen">
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
        {!hideSidebar && <DarkModeToggle />}
      </div>
    </div>
  )
}

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
)

export default App