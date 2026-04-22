import axios from 'axios';
import { Task } from '../types/task';

const API_URL = 'http://localhost:5000/api/tasks';

const api = axios.create({
  baseURL: API_URL,
});

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/');
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  createTask: async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await api.post('/', task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
