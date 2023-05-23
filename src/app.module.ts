import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todo/todos.module';
import { SubtaskModule } from './subtask/subtask.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/development.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_SRV}`),
    TodosModule,
    SubtaskModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
