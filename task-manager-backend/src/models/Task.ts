import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const TaskModel = mongoose.model<ITask>('Task', TaskSchema);

export default TaskModel;
