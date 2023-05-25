import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubtasksService } from '../subtasks.service';
import { ISubtask } from '../interfaces/subtask.interface';
import { CreateSubtaskRequest } from '../dtos/create-subtask.request';
import { UpdateSubtaskRequest } from '../dtos/update-subtask.request';

describe('SubtasksService', () => {
  let subtasksService: SubtasksService;
  let subtaskModel: Model<ISubtask>;

  const mockSubtaskModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    updateMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubtasksService,
        {
          provide: getModelToken('Subtasks'),
          useValue: mockSubtaskModel,
        },
      ],
    }).compile();

    subtaskModel = module.get<Model<ISubtask>>(getModelToken('Subtasks'));
    subtasksService = module.get<SubtasksService>(SubtasksService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new subtask successfully', async () => {
      const subtask: CreateSubtaskRequest = {
        title: 'Sample Subtask',
        todo_id: '123',
      };

      const saveSpy = mockSubtaskModel.create;

      const result = await subtasksService.create(subtask);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual('Created Successfully');
    });

    it('should throw BadRequestException if title or todo_id is missing', async () => {
      const subtask: CreateSubtaskRequest = {
        title: '',
        todo_id: '',
      };

      await expect(subtasksService.create(subtask)).rejects.toThrow(
        HttpException,
      );
    });

    it('should throw HttpException if an error occurs during creation', async () => {
      const subtask: CreateSubtaskRequest = {
        title: 'Sample Subtask',
        todo_id: '123',
      };

      mockSubtaskModel.create.mockRejectedValueOnce(new Error('Test Error'));

      await expect(subtasksService.create(subtask)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('update', () => {
    it('should update a specific subtask successfully', async () => {
      const updateReqest: UpdateSubtaskRequest = {
        status: 'completed',
      };
      const id = '123';

      const findByIdAndUpdateSpy = mockSubtaskModel.findByIdAndUpdate;

      const result = await subtasksService.update(id, updateReqest);

      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
        { _id: id },
        { status: updateReqest.status },
        { new: true },
      );
      expect(result).toEqual('Updated Successfully');
    });

    it('should throw BadRequestException if an invalid status is provided', async () => {
      const updateReqest: UpdateSubtaskRequest = {
        status: 'invalid',
      };
      const id = '123';

      await expect(subtasksService.update(id, updateReqest)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw HttpException if an error occurs during update', async () => {
      const updateReqest: UpdateSubtaskRequest = {
        status: 'completed',
      };
      const id = '123';

      mockSubtaskModel.findByIdAndUpdate.mockRejectedValueOnce(
        new Error('Test Error'),
      );

      await expect(subtasksService.update(id, updateReqest)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
