import { HttpException, HttpStatus } from '@nestjs/common';
import { TodosService } from '../todos.service';
import { getTodosModelStub } from './stubs/get-todos.model';
import { getTransformedTodosStub } from './stubs/get-transformed-todos';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from '../interfaces/todo.interface';

describe('TodosService', () => {
  let todosService: TodosService;
  let todoModel: Model<ITodo>;

  const mockTodoModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    aggregate: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: getModelToken('Todos'), useValue: mockTodoModel },
      ],
    }).compile();

    todoModel = moduleRef.get<Model<ITodo>>(getModelToken('Todos'));
    todosService = moduleRef.get<TodosService>(TodosService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of transformed todos', async () => {
      mockTodoModel.aggregate.mockResolvedValueOnce(getTodosModelStub);
      const result = await todosService.findAll();

      expect(result).toEqual(getTransformedTodosStub);
      expect(mockTodoModel.aggregate).toHaveBeenCalledWith([
        {
          $lookup: {
            from: 'subtasks',
            localField: '_id',
            foreignField: 'todo_id',
            as: 'subtasks',
          },
        },
      ]);
    });

    it('should throw an HttpException if an error occurs during aggregation', async () => {
      const errorMessage = 'An error occurred during aggregation';

      mockTodoModel.aggregate.mockRejectedValueOnce(new Error(errorMessage));

      await expect(todosService.findAll()).rejects.toThrowError(
        new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
      );

      expect(mockTodoModel.aggregate).toHaveBeenCalledWith([
        {
          $lookup: {
            from: 'subtasks',
            localField: '_id',
            foreignField: 'todo_id',
            as: 'subtasks',
          },
        },
      ]);
    });
  });

  describe('create', () => {
    it('should create a new todo successfully', async () => {
      const todo = { title: 'New Todo' };
      const expectedResponse = 'Created Successfully!';

      mockTodoModel.create.mockResolvedValue;

      const result = await todosService.create(todo);

      expect(result).toEqual(expectedResponse);
      expect(mockTodoModel.create).toHaveBeenCalled();
    });

    it('should throw a HttpException if an error occurs', async () => {
      const todo = { title: 'New Todo' };
      const errorMessage = 'Some error message';

      mockTodoModel.create.mockRejectedValue(new Error(errorMessage));

      await expect(todosService.create(todo)).rejects.toThrow(HttpException);
      expect(mockTodoModel.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the todo status and return success message if the status is valid', async () => {
      const todoId = '12345';
      const updateRequest = {
        status: 'completed',
      };

      const updateResult = 'Updated Successfully!';
      mockTodoModel.findByIdAndUpdate.mockResolvedValueOnce(updateResult);

      const result = await todosService.update(todoId, updateRequest);

      expect(result).toEqual(updateResult);
      expect(mockTodoModel.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: todoId },
        { status: updateRequest.status },
        { new: true },
      );
    });

    it('should throw BadRequestException if an invalid status is provided', async () => {
      const todoId = '12345';
      const updateRequest = {
        status: 'invalid',
      };

      await expect(
        todosService.update(todoId, updateRequest),
      ).rejects.toThrowError('Please Select a valid status');
    });

    it('should throw HttpException with a BAD_REQUEST status if an error occurs during update', async () => {
      const todoId = '12345';
      const updateRequest = {
        status: 'completed',
      };

      const error = new Error('Update failed');
      mockTodoModel.findByIdAndUpdate.mockRejectedValueOnce(error);

      await expect(
        todosService.update(todoId, updateRequest),
      ).rejects.toThrowError('Update failed');
      expect(mockTodoModel.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: todoId },
        { status: updateRequest.status },
        { new: true },
      );
    });
  });
});
