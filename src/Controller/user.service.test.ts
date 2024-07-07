import {
  createUser,
  deleteUser,
  findUser,
  getUsers,
  updateUser,
} from './user.service';
import { User } from '../models/user/user.schema';
import { Gender } from '../models/user/user.enum';
import { findUserById } from './user.route';

jest.mock('../models/user/user.schema', () => ({
  User: {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe('createUser', () => {
  it('should create a new user successfully', async () => {
    const mockUserData = {
      firstname: 'Alice',
      lastname: 'gh',
      nationalID: '0022229214',
      phonenumber: '.9339935248',
      gender: Gender.female,
      telephone: '0217756482',
      address: 'street city',
    };
    const mockNewUser = { _id: '123', ...mockUserData };

    (User.create as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockNewUser),
    );

    const result = await createUser(mockUserData);

    expect(result.status).toEqual('Success');
    expect(result.data).toEqual(mockNewUser);
  });

  it('should return a failure status when an error occurs', async () => {
    const mockUserData = {
      firstname: 'Alice',
      lastname: 'gh',
      nationalID: '0022229214',
      phonenumber: '.9339935248',
      gender: Gender.female,
      telephone: '0217756482',
      address: 'street city',
    };
    const mockError = new Error('Mock error message');

    (User.create as jest.Mock).mockImplementation(() =>
      Promise.reject(mockError),
    );

    const result = await createUser(mockUserData);

    expect(result.status).toEqual('Failed');
    expect(result.message).toEqual(mockError);
  });
});

describe('getUsers', () => {
  it('should return a list of users if successful', async () => {
    const mockUsers = [{ name: 'User1' }, { name: 'User2' }];
    jest.spyOn(User, 'find').mockResolvedValue(mockUsers);

    const result = await getUsers();

    expect(result).toEqual({ user: mockUsers });
  });

  it('should return status "Failed" and error message if an error occurs', async () => {
    const mockError = new Error('Mock error message');

    jest.spyOn(User, 'find').mockRejectedValue(mockError);

    const result = await getUsers();

    expect(result.status).toEqual('Failed');
    expect(result.message).toEqual(mockError);
  });

  describe('findUser', () => {
    it('should return user data if user is found', async () => {
      const mockUser = [
        {
          _id: '668549a2e7e74f6af1195101',
          firstname: 'maryam',
          lastname: 'gsdfghjkh',
          nationalID: '22229205',
          phonenumber: '09339935281',
          gender: 'Female',
          telephone: '02177040165',
          address: 'تهران اندیشه',
          createdAt: '2024-07-03T12:52:50.405Z',
          updatedAt: '2024-07-03T15:02:38.118Z',
          __v: 0,
        },
        {
          _id: '668549a2e7e74f6af1195101',
          firstname: 'maryam',
          lastname: 'gsdfghjkh',
          nationalID: '22229205',
          phonenumber: '09339935281',
          gender: 'Female',
          telephone: '02177040165',
          address: 'تهران اندیشه',
          createdAt: '2024-07-03T12:52:50.405Z',
          updatedAt: '2024-07-03T15:02:38.118Z',
          __v: 0,
        },
      ];
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser);

      const result = await findUser('1');

      expect(result.status).toEqual('Success');
      expect(result.data).toEqual(mockUser);
    });

    it('should return "Failed" status and appropriate error message if user is not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(null);

      const result = await findUser('2');

      expect(result.status).toEqual('Failed');
      expect(result.message).toEqual('user not found');
    });

    it('should return "Failed" status and error message if an error occurs', async () => {
      const errorMessage = 'Error message here';
      jest.spyOn(User, 'findById').mockRejectedValue(errorMessage);

      const result = await findUser('3');

      expect(result.status).toEqual('Failed');
      expect(result.message).toEqual(errorMessage);
    });
  });

  describe('updateUser', () => {
    it('should update user data if user is found', async () => {
      const mockUser = {
        firstname: 'ma',
        lastname: 'gshjkh',
        nationalID: '229205',
        phonenumber: '09339281',
        gender: Gender.female,
        telephone: '02177040165',
        address: 'تهران اندیشه',
      };

      const mockUserUpdate = {
        _id: '1',
        firstname: 'ma',
        lastname: 'gshjkh',
        nationalID: '229205',
        phonenumber: '09339281',
        gender: Gender.female,
        telephone: '02177040165',
        address: 'تهران اندیشه',
        createdAt: '2024-07-03T12:52:50.405Z',
        updatedAt: '2024-07-03T15:02:38.118Z',
        __v: 0,
      };
      jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue(mockUserUpdate);

      const result = await updateUser('1', mockUser);

      expect(result.status).toEqual('Success');
      expect(result.data).toEqual(mockUserUpdate);
    });

    it('should return "Failed" status and appropriate error message if user is not found', async () => {
      jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue(null);

      const mockUser = {
        firstname: 'ma',
        lastname: 'gshjkh',
        nationalID: '229205',
        phonenumber: '09339281',
        gender: Gender.female,
        telephone: '02177040165',
        address: 'تهران اندیشه',
      };
      const result = await updateUser('2', mockUser);

      expect(result.status).toEqual('Failed');
      expect(result.message).toEqual('user not found');
    });

    it('should return "Failed" status and error message if an error occurs', async () => {
      const errorMessage = 'Error message here';
      jest.spyOn(User, 'findByIdAndUpdate').mockRejectedValue(errorMessage);
      const mockUser = {
        firstname: 'ma',
        lastname: 'gshjkh',
        nationalID: '229205',
        phonenumber: '09339281',
        gender: Gender.female,
        telephone: '02177040165',
        address: 'تهران اندیشه',
      };
      const result = await updateUser('3', mockUser);

      expect(result.status).toEqual('Failed');
      expect(result.message).toEqual(errorMessage);
    });
  });

  describe('delete user', () => {
    it('should delete user', async () => {
      const mockUser = {
        _id: '1',
        firstname: 'ma',
        lastname: 'gshjkh',
        nationalID: '229205',
        phonenumber: '09339281',
        gender: Gender.female,
        telephone: '02177040165',
        address: 'تهران اندیشه',
        createdAt: '2024-07-03T12:52:50.405Z',
        updatedAt: '2024-07-03T15:02:38.118Z',
        __v: 0,
      };
      jest.spyOn(User, 'findByIdAndDelete').mockResolvedValue(mockUser);
      const message = 'user deleted';
      const result = await deleteUser('1');
      expect(result.status).toEqual('Success');
      expect(result.message).toEqual(message);
    });

    it('should return "Failed" status and appropriate error message if user is not found', async () => {
      jest.spyOn(User, 'findByIdAndDelete').mockResolvedValue(null);

      const result = await deleteUser('2');

      expect(result.status).toEqual('Failed');
      expect(result.message).toEqual('user not found');
    });

    it('should return "Failed" status and error message if an error occurs', async () => {
      const errorMessage = 'Error message here';
      jest.spyOn(User, 'findByIdAndDelete').mockRejectedValue(errorMessage);

      const result = await deleteUser('3');

      expect(result.status).toEqual('Failed');
      expect(result.message).toEqual(errorMessage);
    });
  });
});
