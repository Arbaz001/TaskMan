import React from 'react';
import { Pencil, Trash2, CheckCircle, Clock } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-red-400';
      case 'Medium': return 'border-yellow-400';
      default: return 'border-green-400';
    }
  };
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      default: return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
    }
  };
  return (
    <div className={`group relative bg-white dark:bg-gray-900 rounded-2xl shadow-md border-l-4 ${getPriorityColor(task.priority)} flex flex-col gap-2 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-w-md w-full mx-auto`}>  
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {task.completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Clock className="w-5 h-5 text-blue-400" />
          )}
          <h3 className="font-semibold text-lg text-purple-800 dark:text-purple-200 truncate max-w-[180px]">{task.title}</h3>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getPriorityBadge(task.priority)}`}>{task.priority}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-200 text-sm mb-1 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>Due: <span className="font-medium text-gray-700 dark:text-gray-200">{new Date(task.dueDate).toLocaleDateString()}</span></span>
        <span>Status: <span className={task.completed ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-blue-600 dark:text-blue-400 font-semibold'}>{task.completed ? 'Completed' : 'In Progress'}</span></span>
      </div>
      <div className="flex gap-2 mt-4">
        <button aria-label="Edit Task" onClick={()=>onEdit(task)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"><Pencil size={15} /> Edit</button>
        <button aria-label="Delete Task" onClick={()=>onDelete(task)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"><Trash2 size={15} /> Delete</button>
      </div>
    </div>
  );
};

export default TaskCard; 