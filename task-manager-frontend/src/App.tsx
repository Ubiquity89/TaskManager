import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskFilter from './components/TaskFilter';
import type { Task } from './types/task';
import type { TaskFilter as FilterType } from './types/task';
import { taskService } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error fetching tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const handleTaskDeleted = (deletedId: string) => {
    setTasks(tasks.filter(task => task._id !== deletedId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => ({
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  });

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p>Organize your work efficiently</p>
      </header>

      <main className="app-main">
        <div className="task-form-container">
          <TaskForm
            onTaskAdded={handleTaskAdded}
            editingTask={editingTask}
            onTaskUpdated={handleTaskUpdated}
            onCancel={handleCancelEdit}
          />
        </div>

        <div className="task-list-container">
          <div className="task-list-header">
            <h2>Tasks</h2>
            <TaskFilter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              taskCounts={taskCounts}
            />
          </div>

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="no-tasks">
              {currentFilter === 'all' 
                ? 'No tasks yet. Add your first task above!' 
                : `No ${currentFilter} tasks.`}
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                  onEditTask={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Total Tasks: {taskCounts.total} | Completed: {taskCounts.completed} | Pending: {taskCounts.pending}</p>
      </footer>
    </div>
  );
};

export default App;
