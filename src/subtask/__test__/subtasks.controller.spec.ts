import { Test } from '@nestjs/testing';
import { SubtasksController } from '../subtasks.controller';
import { SubtasksService } from '../subtasks.service';
import { CreateSubtaskRequest } from '../dtos/create-subtask.request';
import { UpdateSubtaskRequest } from '../dtos/update-subtask.request';

describe('SubtasksController', () => {
  let subtasksController: SubtasksController;
  let subtasksService: SubtasksService;

  const mockSubtaskServcie = {
    create: jest.fn(),
    update: jest.fn(),
    updateAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SubtasksController],
      providers: [{ provide: SubtasksService, useValue: mockSubtaskServcie }],
    }).compile();

    subtasksController = moduleRef.get<SubtasksController>(SubtasksController);
    subtasksService = moduleRef.get<SubtasksService>(SubtasksService);
  });

  describe('create', () => {
    it('should create a new subtask', async () => {
      const createSubtaskRequest: CreateSubtaskRequest = {
        title: 'new subtask',
        todo_id: '1',
      };
      const expectedResponse = 'Subtask created';
      mockSubtaskServcie.create.mockResolvedValue(expectedResponse);

      const result = await subtasksController.create(createSubtaskRequest);

      expect(result).toEqual(expectedResponse);
      expect(mockSubtaskServcie.create).toHaveBeenCalledWith(createSubtaskRequest);
    });
  });

  describe('update', () => {
    it('should update a subtask', async () => {
      const id = '1';
      const updateSubtaskRequest: UpdateSubtaskRequest = {
        status: 'completed',
      };
      const expectedResponse = 'Subtask updated';
      mockSubtaskServcie.update.mockResolvedValue(expectedResponse);

      const result = await subtasksController.update(id, updateSubtaskRequest);

      expect(result).toEqual(expectedResponse);
      expect(mockSubtaskServcie.update).toHaveBeenCalledWith(id, updateSubtaskRequest);
    });
  });

  describe('updateAll', () => {
    it('should update all subtasks for a specific todo_id', async () => {
     
      const todoId = '1';
      const updateSubtaskRequest: UpdateSubtaskRequest = {
        status: 'pending',
      };
      const expectedResponse = 'All subtasks updated';
      mockSubtaskServcie.updateAll.mockResolvedValue(expectedResponse);

      const result = await subtasksController.updateAll(todoId, updateSubtaskRequest);

      expect(result).toEqual(expectedResponse);
      expect(mockSubtaskServcie.updateAll).toHaveBeenCalledWith(todoId, updateSubtaskRequest);
    });
  });
});