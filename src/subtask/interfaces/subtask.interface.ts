import { Document, Types } from 'mongoose';

export interface ISubtask extends Document {
  title: string;
  todo_id: Types.ObjectId;
  status: 'pending' | 'completed';
  created_at: Date;
}
