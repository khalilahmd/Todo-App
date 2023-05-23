import { Document } from "mongoose";

export interface ITodo extends Document{
    title: string;
    status: 'pending' | 'completed';
    created_at: Date;
}