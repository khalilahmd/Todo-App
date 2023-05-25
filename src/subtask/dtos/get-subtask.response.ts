import { Types } from 'mongoose';

export class GetSubtaskResponse {
  id: Types.ObjectId | string;
  title: string;
  status: string;
  created_at: string;
}
