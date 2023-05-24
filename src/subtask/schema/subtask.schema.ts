import * as mongoose from 'mongoose';
import { ISubtask } from '../interfaces/subtask.interface';

export const SubtaskSchema = new mongoose.Schema<ISubtask>({
  title: {
    type: String,
    required: true,
  },
  todo_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Todos',
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
