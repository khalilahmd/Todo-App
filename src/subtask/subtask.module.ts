import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubtaskSchema } from './schema/subtask.schema';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subtasks', schema: SubtaskSchema }]),
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService],
  exports: [SubtasksService],
})
export class SubtaskModule {}
