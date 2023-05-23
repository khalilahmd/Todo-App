import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ISubtask } from "./interfaces/subtask.interface";
import { CreateSubtaskRequest } from "./dtos/create-subtask.request";
import { UpdateSubtaskRequest } from "./dtos/update-subtask.request";

@Injectable()
export class SubtasksService {
    constructor(@InjectModel('Subtasks') private readonly subtaskModel: Model<ISubtask>) {}

    findAll = async (): Promise<ISubtask[]> =>{
        const subtasks = await this.subtaskModel
        .find()
        .populate('todo_id')
        .exec();

        return subtasks;
    }

    create = async (subtask: CreateSubtaskRequest): Promise<ISubtask> => {
        try {
            if (!subtask?.title || !subtask?.todo_id) {
                throw new BadRequestException('Title and Todo_Id both are required');
            }
            const newTodo = new this.subtaskModel(subtask);
            return await newTodo.save();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    update = async (id: any, updateReqest: UpdateSubtaskRequest): Promise<ISubtask> => {
        const { status } = updateReqest;
        if (status === 'pending' || status === 'completed') {
            try {
                const updatedTodo = await this.subtaskModel.findByIdAndUpdate(
                    {_id: id},
                    { status},
                    {new: true},
                )
        
                return updatedTodo;
            } catch (error) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new BadRequestException('Please Select a valid status');
        }
    } 
}