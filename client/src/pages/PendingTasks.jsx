import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import api from '../api';

const PendingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tasks/gp');
      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks.filter(t => !t.completed) : []);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };
  const handleDelete = async (task) => {
    try {
      await api.delete(`/tasks/${task._id}/gp`);
      fetchTasks();
    } catch (err) {
      setError('Delete failed');
    }
  };
  const handleModalSubmit = async (form) => {
    try {
      await api.put(`/tasks/${editTask._id}/gp`, form);
      setShowModal(false);
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pending Task</h1>
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
            <div className="bg-white p-6 rounded shadow text-center text-gray-400">No pending tasks</div>
          ) : (
            tasks.map(task => <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />)
          )}
        </div>
      )}
      <TaskModal open={showModal} onClose={()=>setShowModal(false)} onSubmit={handleModalSubmit} initialData={editTask} />
    </div>
  );
};

export default PendingTasks; 