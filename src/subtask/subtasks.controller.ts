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
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskRequest } from './dtos/create-subtask.request';
import { UpdateSubtaskRequest } from './dtos/update-subtask.request';
import { ISubtask } from './interfaces/subtask.interface';

@Controller('subtasks')
@UseInterceptors(ResponseInterceptor)
export class SubtasksController {
  constructor(private readonly subtaskService: SubtasksService) {}

  // To create new subtask
  @Post()
  async create(@Body() subtask: CreateSubtaskRequest): Promise<string> {
    return this.subtaskService.create(subtask);
  }

  // To update a subtask
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() subtaskRequest: UpdateSubtaskRequest,
  ): Promise<string> {
    return await this.subtaskService.update(id, subtaskRequest);
  }

  // To update all subtasks based on some specific todo_id
  @Put('update-all/:id')
  async updateAll(
    @Param('id') todoId: string,
    @Body() subtaskRequest: UpdateSubtaskRequest,
  ): Promise<string> {
    return await this.subtaskService.updateAll(todoId, subtaskRequest);
  }
}
