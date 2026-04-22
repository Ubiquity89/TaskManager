import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { taskService } from '../services/api';

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
  editingTask?: Task | null;
  onTaskUpdated?: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onTaskAdded, 
  editingTask, 
  onTaskUpdated,
  onCancel 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form fields when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title?.trim() || !description?.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    setLoading(true);

    try {
      if (editingTask && onTaskUpdated) {
        const updatedTask = await taskService.updateTask(editingTask._id, {
          title,
          description,
          completed: editingTask.completed
        });
        onTaskUpdated(updatedTask);
      } else {
        const newTask = await taskService.createTask({
          title,
          description,
          completed: false
        });
        onTaskAdded(newTask);
      }
      
      setTitle('');
      setDescription('');
      onCancel?.();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error saving task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onCancel?.();
  };

  return (
    <div className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={100}
            required
          />
          <small>{title?.length || 0}/100 characters</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            maxLength={500}
            required
            rows={4}
          />
          <small>{description?.length || 0}/500 characters</small>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Add Task')}
          </button>
          {editingTask && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
