import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../test/utils/TestUtils';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find all users', () => {
    it('should list all users', async () => {
      const user = TestUtil.createAValidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const returnedUsers = await service.findAll();

      expect(returnedUsers).toHaveLength(2);
      expect(mockRepository.find).toBeCalledTimes(1);
    });
  });

  describe('Find one user', () => {
    it("should get a single user's data", async () => {
      const user = TestUtil.createAValidUser();
      delete user.password;

      mockRepository.findOne.mockReturnValue(user);
      const returnedUsers = await service.findOne(1);

      expect(returnedUsers).toMatchObject({
        name: user.name,
        email: user.email,
      });
      expect(returnedUsers).not.toHaveProperty('password');
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('Create an user', () => {
    it('should create a new user', async () => {
      const user = TestUtil.createAValidUser();
      delete user.password;

      mockRepository.findOne.mockReturnValue(null);

      mockRepository.save.mockReturnValue(user);
      const createdUser = await service.create(user);

      expect(createdUser).toMatchObject({
        name: user.name,
        email: user.email,
      });
      expect(createdUser).not.toHaveProperty('password');
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should not create a new user (email already taken)', async () => {
      const user = TestUtil.createAValidUser();
      delete user.password;

      mockRepository.findOne.mockReturnValue(user);

      mockRepository.save.mockReturnValue(user);
      await service.create(user).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({
          message: 'E-mail has already been taken',
        });
      });
    });
  });

  describe('Delete an existing user', () => {
    it('should delete an user', async () => {
      const user = TestUtil.createAValidUser();
      delete user.password;

      mockRepository.delete.mockReturnValue(null);
      await service.remove(1);

      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });

  describe('Update an existing user', () => {
    it('should update an user', async () => {
      const user = TestUtil.createAValidUser();
      delete user.password;

      const dataToBeUpdated = { name: 'Cleber' };

      mockRepository.findOne.mockReturnValue(user);
      mockRepository.save.mockReturnValue({ ...user, ...dataToBeUpdated });
      const updatedUser = await service.update(1, dataToBeUpdated);

      expect(updatedUser).toMatchObject({ ...user, ...dataToBeUpdated });
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should not update an user (user not found)', async () => {
      const dataToBeUpdated = { name: 'Cleber' };

      mockRepository.findOne.mockReturnValue(null);
      await service.update(1, dataToBeUpdated).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.save).toBeCalledTimes(0);
      });
    });

    it('should not update an user (email already taken)', async () => {
      const user = TestUtil.createAValidUser();
      delete user.password;

      const dataToBeUpdated = { email: 'test2@gmail.com' };

      mockRepository.findOne.mockReturnValueOnce(user);
      mockRepository.findOne.mockReturnValueOnce({
        ...user,
        email: 'test2@gmail.com',
      });
      await service.update(1, dataToBeUpdated).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({
          message: 'E-mail has already been taken',
        });
        expect(mockRepository.findOne).toBeCalledTimes(2);
        expect(mockRepository.save).toBeCalledTimes(0);
      });
    });
  });
});
