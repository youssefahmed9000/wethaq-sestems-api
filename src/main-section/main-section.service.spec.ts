
import {
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Redis } from 'ioredis';

import { MainSectionService } from './main-section.service';
import {
  MainSection,
  MainSectionDocument,
} from './schemas/main-section.schema';
import { REDIS_CLIENT } from 'src/common/redis/redis.provider';

describe('MainSectionService', () => {
  let service: MainSectionService;

  let mainSectionModel: {
    findOne: jest.Mock;
    findOneAndUpdate: jest.Mock;
  };

  let redis: {
    get: jest.Mock;
    set: jest.Mock;
    del: jest.Mock;
  };

  beforeEach(async () => {
    mainSectionModel = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };

    redis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          MainSectionService,
          {
            provide: getModelToken(MainSection.name),
            useValue: mainSectionModel,
          },
          {
            provide: REDIS_CLIENT,
            useValue: redis,
          },
        ],
      }).compile();

    service = module.get<MainSectionService>(
      MainSectionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

// 1. Test getMainSection() when Redis cache is hit
  
it('should return main section from Redis cache', async () => {
  const cachedSection = {
    title: {
      en: 'Welcome',
      ar: 'أهلاً',
    },
    description: {
      en: 'Our main section',
      ar: 'القسم الرئيسي',
    },
  };

  redis.get.mockResolvedValue(
    JSON.stringify(cachedSection),
  );

  const result = await service.getMainSection();

  expect(result).toEqual(cachedSection);

  expect(redis.get).toHaveBeenCalledWith(
    'main-section',
  );

  expect(mainSectionModel.findOne).not.toHaveBeenCalled();

  expect(redis.set).not.toHaveBeenCalled();
});

// * 2. Test getMainSection() when Redis cache is missed and MongoDB has the data

it('should fetch from MongoDB and cache the result on cache miss', async () => {
  const sectionFromDatabase = {
    _id: 'main-section-id',
    title: {
      en: 'Welcome',
      ar: 'أهلاً',
    },
  };

  redis.get.mockResolvedValue(null);

  const leanMock = jest.fn().mockResolvedValue(
    sectionFromDatabase,
  );

  mainSectionModel.findOne.mockReturnValue({
    lean: leanMock,
  });

  const result = await service.getMainSection();

  expect(result).toEqual(sectionFromDatabase);

  expect(mainSectionModel.findOne).toHaveBeenCalledTimes(1);

  expect(leanMock).toHaveBeenCalledTimes(1);

  expect(redis.set).toHaveBeenCalledWith(
    'main-section',
    JSON.stringify(sectionFromDatabase),
    'EX',
    300,
  );
});

// 

it('should throw NotFoundException when main section does not exist', async () => {
  redis.get.mockResolvedValue(null);

  const leanMock = jest.fn().mockResolvedValue(null);

  mainSectionModel.findOne.mockReturnValue({
    lean: leanMock,
  });

  await expect(
    service.getMainSection(),
  ).rejects.toThrow(NotFoundException);

  expect(redis.set).not.toHaveBeenCalled();
});
});