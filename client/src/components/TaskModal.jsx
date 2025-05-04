import React, { useState, useEffect } from 'react';

const TaskModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    completed: false,
  });

  useEffect(() => {
    if (initialData) setForm({
      ...initialData,
      completed: !!initialData.completed,
      dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
    });
    else setForm({ title: '', description: '', priority: 'Low', dueDate: '', completed: false });
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanForm = {
      ...form,
      completed: !!form.completed,
    };
    console.log('TaskModal submitting:', cleanForm);
    onSubmit(cleanForm);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5 text-purple-800">{initialData ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-300" placeholder="Task Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
          <textarea className="border border-gray-300 rounded-lg px-4 py-3 w-full h-24 focus:border-purple-500 focus:ring-1 focus:ring-purple-300" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
          <div className="flex gap-4">
            <select className="border border-gray-300 rounded-lg px-4 py-3 flex-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-300" value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input type="date" className="border border-gray-300 rounded-lg px-4 py-3 flex-1 focus:border-purple-500 focus:ring-1 focus:ring-purple-300" value={form.dueDate} onChange={e=>setForm({...form, dueDate: e.target.value})} required />
          </div>
          <div className="flex gap-6 items-center border-t border-gray-200 pt-4 mt-2">
            <span className="font-medium text-gray-600">Status:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="completed" value="true" checked={form.completed === true} onChange={()=>setForm({...form, completed: true})} className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"/> <span className={form.completed ? 'text-green-700 font-semibold' : 'text-gray-500'}>Completed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="completed" value="false" checked={form.completed === false} onChange={()=>setForm({...form, completed: false})} className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/> <span className={!form.completed ? 'text-blue-700 font-semibold' : 'text-gray-500'}>In Progress</span>
            </label>
          </div>
          <div className="flex gap-3 mt-5">
            <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold">{initialData ? 'Update Task' : 'Create Task'}</button>
            <button type="button" className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-all font-semibold" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal; 