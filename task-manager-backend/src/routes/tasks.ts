import express, { Request, Response } from 'express';
import TaskModel, { ITask } from '../models/Task';

const router = express.Router();

// GET all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();
    // Sort by createdAt in descending order
    tasks.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// GET task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.id as string);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
});

// POST create new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const savedTask = await TaskModel.create({
      title,
      description,
      completed: false
    });

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// PUT update task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    
    // Only update fields that are provided
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    
    const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id as string, updateData);

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id as string);
    
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

export default router;
