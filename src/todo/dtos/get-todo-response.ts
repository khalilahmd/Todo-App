import { Types } from 'mongoose';

export class GetTodoResponse {
  id: Types.ObjectId | string;
  title: string;
  status: string;
  created_at: string;
  completedSubtasks: number;
  totalSubtasks: number;
  subtasks: GetTodoResponse[];
}
