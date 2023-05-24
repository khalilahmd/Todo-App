import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { TodosService } from './todos.service';
import { CreateTodoRequest } from './dtos/create-todo.request';
import { UpdateTodoRequest } from './dtos/update-todo.request';
import { GetTodoResponse } from './dtos/get-todo-response';

@Controller('todos')
@UseInterceptors(ResponseInterceptor)
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  // To get all todos available
  @Get()
  async findAll(): Promise<GetTodoResponse[]> {
    return this.todoService.findAll();
  }

  // To create a new todo
  @Post()
  async create(@Body() todo: CreateTodoRequest): Promise<string> {
    return this.todoService.create(todo);
  }

  // To update an existing todo
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRequest: UpdateTodoRequest,
  ): Promise<string> {
    return await this.todoService.update(id, updateRequest);
  }
}
