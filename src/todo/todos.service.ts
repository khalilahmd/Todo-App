import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITodo } from './interfaces/todo.interface';
import { CreateTodoRequest } from './dtos/create-todo.request';
import { UpdateTodoRequest } from './dtos/update-todo.request';
import { GetTodoResponse } from './dtos/get-todo-response';
import { transformTodo } from '../utils/transformTodo';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todos') private readonly todoModel: Model<ITodo>) {}

  // Method to find all available todos
  findAll = async (): Promise<GetTodoResponse[]> => {
    try {
      const todos = await this.todoModel.aggregate([
        {
          $lookup: {
            from: 'subtasks',
            localField: '_id',
            foreignField: 'todo_id',
            as: 'subtasks',
          },
        },
      ]);

      // returning todos in desired format
      return transformTodo(todos);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  // Method to create a new todo
  create = async (todo: CreateTodoRequest): Promise<string> => {
    try {
      if (!todo?.title) {
        throw new BadRequestException('Title is required');
      } 
      await this.todoModel.create(todo);
      return `Created Successfully!`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  // Method to update a specific todo
  update = async (
    id: any,
    updateReqest: UpdateTodoRequest,
  ): Promise<string> => {
    const { status } = updateReqest;
    if (status === 'pending' || status === 'completed') {
      try {
        await this.todoModel.findByIdAndUpdate(
          { _id: id },
          { status },
          { new: true },
        );

        return `Updated Successfully!`;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new BadRequestException('Please Select a valid status');
    }
  };
}
