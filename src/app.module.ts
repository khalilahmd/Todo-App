import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todo/todos.module';
import { SubtaskModule } from './subtask/subtask.module';
import { TodoSeed } from './seeds/001-CreateTodos';
import { TodoSchema } from './todo/schema/todo.schema';
import { SubtaskSchema } from './subtask/schema/subtask.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/development.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_SRV}`),
    MongooseModule.forFeature([
      { name: 'Todos', schema: TodoSchema },
      { name: 'Subtasks', schema: SubtaskSchema },
    ]),
    TodosModule,
    SubtaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, TodoSeed],
})

export class AppModule {
  constructor(private todoSeed: TodoSeed) {}  

  async onModuleInit(): Promise<void> {
    await this.todoSeed.createTodos();
  }
}
