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
import { SubtasksService } from "./subtasks.service";
import { CreateSubtaskRequest } from "./dtos/create-subtask.request";
import { UpdateSubtaskRequest } from "./dtos/update-subtask.request";
import { ISubtask } from "./interfaces/subtask.interface";

@Controller('subtasks')
@UseInterceptors(ResponseInterceptor)
export class SubtasksController {
    constructor(
        private readonly subtaskService: SubtasksService,
    ) {}

    @Get()
    async findAll(): Promise<ISubtask[]> {
        return this.subtaskService.findAll();
    }

    @Post()
    async create(@Body() subtask: CreateSubtaskRequest): Promise<ISubtask> {
        return this.subtaskService.create(subtask);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() subtaskRequest: UpdateSubtaskRequest
    ): Promise<ISubtask> {
        return await this.subtaskService.update(id, subtaskRequest);
    }
}