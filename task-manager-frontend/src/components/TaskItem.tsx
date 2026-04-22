import React, { useState } from 'react';
import { Task } from '../types/task';
import { taskService } from '../services/api';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onTaskUpdated, 
  onTaskDeleted, 
  onEditTask 
}) => {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const updatedTask = await taskService.updateTask(task._id, {
        completed: !task.completed
      });
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await taskService.deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h4 className={task.completed ? 'completed-title' : ''}>
            {task.title}
          </h4>
          <div className="task-actions">
            <button
              onClick={handleToggleComplete}
              disabled={loading}
              className={`btn-complete ${task.completed ? 'completed' : ''}`}
              title={task.completed ? 'Mark as pending' : 'Mark as completed'}
            >
              {task.completed ? '↩️' : '✓'}
            </button>
            <button
              onClick={() => onEditTask(task)}
              className="btn-edit"
              title="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="btn-delete"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <p className="task-description">{task.description}</p>
        
        <div className="task-meta">
          <span className="task-status">
            Status: {task.completed ? 'Completed' : 'Pending'}
          </span>
          <span className="task-date">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
