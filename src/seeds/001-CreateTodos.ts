import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from '../todo/interfaces/todo.interface';
import { ISubtask } from '../subtask/interfaces/subtask.interface';

@Injectable()
export class TodoSeed {
  constructor(
    @InjectModel('Todos') private readonly todoModel: Model<ITodo>,
    @InjectModel('Subtasks') private readonly subtaskModel: Model<ISubtask>,
  ) {}

  async createTodos(): Promise<void> {

    const todoCount = await this.todoModel.countDocuments().exec();
    const subtaskCount = await this.subtaskModel.countDocuments().exec();

    if (todoCount === 0 && subtaskCount === 0) {

      const todo1 = new this.todoModel({ title: 'Todo 1' });
      const todo2 = new this.todoModel({ title: 'Todo 2' });
  
      
      const result1 = await todo1.save(); 
      const result2 = await todo2.save();
    
      const subtask1 = new this.subtaskModel({ title: 'Subtask 1', todo_id: result1._id});
      const subtask2 = new this.subtaskModel({ title: 'Subtask 2', todo_id: result2._id});
    
      await subtask1.save();
      await subtask2.save();
      console.log('Seeding completed.');
    } else {
      console.log('Database already contains records. Skipping seeding.');
    }
  }
}
