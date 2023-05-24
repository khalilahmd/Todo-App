import { Types } from 'mongoose';

export class GetSubtaskResponse {
  id: Types.ObjectId;
  title: string;
  status: string;
  created_at: string;
}
