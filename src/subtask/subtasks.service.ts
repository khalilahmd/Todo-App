  import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  import { ISubtask } from './interfaces/subtask.interface';
  import { CreateSubtaskRequest } from './dtos/create-subtask.request';
  import { UpdateSubtaskRequest } from './dtos/update-subtask.request';

  @Injectable()
  export class SubtasksService {
    constructor(
      @InjectModel('Subtasks') private readonly subtaskModel: Model<ISubtask>,
    ) {}

    // Method to create a new Subtask
    create = async (subtask: CreateSubtaskRequest): Promise<string> => {
      try {
        if (!subtask?.title || !subtask?.todo_id) {
          throw new BadRequestException('Title and Todo_Id both are required');
        }
        await this.subtaskModel.create(subtask); 
        return `Created Successfully`;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    };

    // Method to update specific subtask based on id
    update = async (
      id: any,
      updateReqest: UpdateSubtaskRequest,
    ): Promise<string> => {
      const { status } = updateReqest;
      if (status === 'pending' || status === 'completed') {
        try {
          await this.subtaskModel.findByIdAndUpdate(
            { _id: id },
            { status },
            { new: true },
          );

          return `Updated Successfully`;
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new BadRequestException('Please Select a valid status');
      }
    };

    // Method to update all subtask based on a specific todo_id
    updateAll = async (
      todoId: any,
      updateReqest: UpdateSubtaskRequest,
    ): Promise<string> => {
      const { status } = updateReqest;
      if (status === 'pending' || status === 'completed') {
        try {
          await this.subtaskModel
            .updateMany({ todo_id: todoId }, { $set: { status } })
            .exec();

          return `Updated Successfully`;
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new BadRequestException('Please Select a valid status');
      }
    };
  }
