import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TaskModal from '../components/TaskModal';
import api from '../api';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiRaw, setApiRaw] = useState(null);
  const location = useLocation();

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tasks/gp');
      console.log('Tasks API response:', res.data);
      setApiRaw(res.data);
      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
    } catch (err) {
      setError('Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [location.pathname]);

  const handleCreateTask = async (form) => {
    try {
      await api.post('/tasks/gp', form);
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      setError('Create task failed');
    }
  };

  const stats = {
    total: Array.isArray(tasks) ? tasks.length : 0,
    completed: Array.isArray(tasks) ? tasks.filter(t => t.completed).length : 0,
    pending: Array.isArray(tasks) ? tasks.filter(t => !t.completed).length : 0,
    completionRate: Array.isArray(tasks) && tasks.length
      ? Math.round(tasks.filter(t => t.completed).length / tasks.length * 100)
      : 0,
  };
  console.log('Dashboard tasks:', tasks);
  console.log('Dashboard stats:', stats);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-800">Task Overview</h1>
        <button onClick={()=>setShowModal(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold">+ Add New Task</button>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading dashboard...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-white p-6 rounded-xl shadow-lg text-center transition-shadow hover:shadow-purple-100">
              <div className="text-4xl font-bold text-purple-700 mb-1">{stats.total}</div>
              <div className="text-gray-500 font-medium">Total Tasks</div>
            </div>
            <div className="card bg-white p-6 rounded-xl shadow-lg text-center transition-shadow hover:shadow-purple-100">
              <div className="text-4xl font-bold text-blue-600 mb-1">{stats.pending}</div>
              <div className="text-gray-500 font-medium">Pending</div>
            </div>
            <div className="card bg-white p-6 rounded-xl shadow-lg text-center transition-shadow hover:shadow-purple-100">
              <div className="text-4xl font-bold text-green-600 mb-1">{stats.completed}</div>
              <div className="text-gray-500 font-medium">Completed</div>
            </div>
            <div className="card bg-white p-6 rounded-xl shadow-lg text-center transition-shadow hover:shadow-purple-100">
              <div className="text-4xl font-bold text-pink-600 mb-1">{stats.completionRate}%</div>
              <div className="text-gray-500 font-medium">Completion Rate</div>
            </div>
          </div>
          {Array.isArray(tasks) && tasks.length === 0 && !loading && !error ? (
            <div className="bg-white p-10 rounded-xl shadow-lg text-center text-gray-400">No tasks found<br/>Create your first task to get started</div>
          ) : null}
        </>
      )}
      <TaskModal open={showModal} onClose={()=>setShowModal(false)} onSubmit={handleCreateTask} />
    </div>
  );
};

export default Dashboard;
