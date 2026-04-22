import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage for demo purposes
let inMemoryTasks: any[] = [];

// Helper function to generate consistent string IDs
const generateTaskId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Mock model for when MongoDB is not available
export const TaskModel = {
  find: async () => {
    return [...inMemoryTasks]; // Return a copy to prevent mutation
  },
  findById: async (id: string) => {
    return inMemoryTasks.find(task => task._id === id);
  },
  create: async (data: any) => {
    const newTask = {
      _id: generateTaskId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    inMemoryTasks.unshift(newTask);
    return newTask;
  },
  findByIdAndUpdate: async (id: string, data: any) => {
    const index = inMemoryTasks.findIndex(task => task._id === id);
    if (index !== -1) {
      inMemoryTasks[index] = {
        ...inMemoryTasks[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return inMemoryTasks[index];
    }
    return null;
  },
  findByIdAndDelete: async (id: string) => {
    const index = inMemoryTasks.findIndex(task => task._id === id);
    if (index !== -1) {
      const deleted = inMemoryTasks[index];
      inMemoryTasks.splice(index, 1);
      return deleted;
    }
    return null;
  }
};

export default TaskModel;
