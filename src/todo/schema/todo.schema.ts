import { Schema } from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';

export const TodoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
