import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import api from '../api';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tasks/gp');
      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks.filter(t => t.completed) : []);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [location.pathname]);

  const handleEdit = (task) => {
    // For future extensibility (if you want to edit completed tasks)
    fetchTasks();
  };

  const handleDelete = async (task) => {
    try {
      await api.delete(`/tasks/${task._id}/gp`);
      fetchTasks();
    } catch (err) {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Completed Tasks</h1>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded">Sort by: Newest</button>
          <button className="px-3 py-1 bg-gray-200 rounded">Priority</button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-center text-gray-400">No completed tasks</div>
          ) : (
            tasks.map(task => <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />)
          )}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks; 