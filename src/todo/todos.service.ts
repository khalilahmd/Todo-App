import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ITodo } from "./interfaces/todo.interface";
import { CreateTodoRequest } from "./dtos/create-todo.request";
import { UpdateTodoRequest } from "./dtos/update-todo.request";

@Injectable()
export class TodosService {
    constructor(@InjectModel('Todos') private readonly todoModel: Model<ITodo>) {}

    findAll = async (): Promise<ITodo[]> =>{
        const todos = await this.todoModel
        .aggregate([
            {
                $lookup: {
                    from: 'subtasks',
                    localField: '_id',
                    foreignField: 'todo_id',
                    as: 'subtask'
                }
            }
        ])
        return todos;
    }

    create = async (todo: CreateTodoRequest): Promise<ITodo> => {
        try {
            if (!todo?.title) {
                throw new BadRequestException('Title is required');
            }
            const newTodo = new this.todoModel(todo);
            return newTodo.save();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    update = async (id: any, updateReqest: UpdateTodoRequest): Promise<ITodo> => {
        const { status } = updateReqest;
        if (status === 'pending' || status === 'completed') {
            try {
                const updatedTodo = await this.todoModel.findByIdAndUpdate(
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