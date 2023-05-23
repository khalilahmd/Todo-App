import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
} from "@nestjs/common"
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { TodosService } from "./todos.service";
import { ITodo } from "./interfaces/todo.interface";
import { CreateTodoRequest } from "./dtos/create-todo.request";
import { UpdateTodoRequest } from "./dtos/update-todo.request";

@Controller('todos')
@UseInterceptors(ResponseInterceptor)
export class TodosController {
    constructor(
        private readonly todoService: TodosService,
    ) {}

    @Get()
    async findAll(): Promise<ITodo[]> {
        return this.todoService.findAll();
    }

    @Post()
    async create(@Body() todo: CreateTodoRequest): Promise<ITodo> {
        return this.todoService.create(todo);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateRequest: UpdateTodoRequest
    ): Promise<ITodo> {
        return await this.todoService.update(id, updateRequest);
    }
}