import { Test } from '@nestjs/testing';
import { TodosController } from '../todos.controller';
import { TodosService } from '../todos.service';
import { getTransformedTodosStub } from './stubs/get-transformed-todos';
import { GetTodoResponse } from '../dtos/get-todo-response';
import { CreateTodoRequest } from '../dtos/create-todo.request';
import { UpdateTodoRequest } from '../dtos/update-todo.request';

describe('TodoController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  const mockTodosServcie = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: mockTodosServcie }],
    }).compile();

    todosController = moduleRef.get<TodosController>(TodosController);
    todosService = moduleRef.get<TodosService>(TodosService);
  });

  describe('findAll', () => {
    it('should return an array of todo items', async () => {
      // Arrange
      const expectedResponse: GetTodoResponse[] = getTransformedTodosStub;
      mockTodosServcie.findAll.mockResolvedValue(expectedResponse);

      // Act
      const result = await todosController.findAll();

      // Assert
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should create a new todo item', async () => {
      const createTodoRequest: CreateTodoRequest = {
        title: 'new Todo',
      };
      const expectedResponse = 'Todo item created';
      mockTodosServcie.create.mockResolvedValue(expectedResponse);

      const result = await todosController.create(createTodoRequest);

      expect(result).toEqual(expectedResponse);
      expect(mockTodosServcie.create).toHaveBeenCalledWith(createTodoRequest);
    });
  });

  describe('update', () => {
    it('should update a todo item', async () => {
      const id = '1';
      const updateRequest: UpdateTodoRequest = {
        status: 'pending',
      };
      const expectedResponse = 'Todo item updated';
      mockTodosServcie.update.mockResolvedValue(expectedResponse);

      const result = await todosController.update(id, updateRequest);

      expect(result).toEqual(expectedResponse);
      expect(mockTodosServcie.update).toHaveBeenCalledWith(id, updateRequest);
    });
  });
});
