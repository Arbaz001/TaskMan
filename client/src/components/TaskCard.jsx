import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-600';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="card bg-white p-5 rounded-xl shadow-md flex flex-col gap-3 transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl text-purple-800">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
      </div>
      <p className="text-gray-700 text-base">{task.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mt-2 border-t pt-3">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <span>Status: <span className={task.completed ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>{task.completed ? 'Completed' : 'In Progress'}</span></span>
      </div>
      <div className="flex gap-3 mt-3">
        <button onClick={()=>onEdit(task)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium transition-all"><Pencil size={16} /> Edit</button>
        <button onClick={()=>onDelete(task)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium transition-all"><Trash2 size={16} /> Delete</button>
      </div>
    </div>
  );
};

export default TaskCard; 