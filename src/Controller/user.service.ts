import { User } from '../models/user/user.schema';
import {
  CreateUserInput,
  DeleteUserInput,
  FindUserInput,
  UpdateUserInput,
} from '../types/user.interface';

export async function createUser(data: CreateUserInput) {
  try {
    const newUser = await User.create(data);
    return {
      status: 'Success',
      data: newUser,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 'Failed',
      message: err,
    };
  }
}

export async function getUsers() {
  try {
    const user = await User.find();
    return {
      user,
    };
  } catch (err) {
    return {
      status: 'Failed',
      message: err,
    };
  }
}

export async function findUser(id: string) {
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return {
        status: 'Failed',
        message: 'user not found',
      };
    }
    return {
      status: 'Success',
      data: user,
    };
  } catch (err) {
    return {
      status: 'Failed',
      message: err,
    };
  }
}

export async function updateUser(id: string, data: UpdateUserInput) {
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, data, { new: true });
    if (!user) {
      return {
        status: 'Failed',
        message: 'user not found',
      };
    }
    return {
      status: 'Success',
      data: user,
    };
  } catch (err) {
    return {
      status: 'Failed',
      message: err,
    };
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return {
        status: 'Failed',
        message: 'user not found',
      };
    }
    return {
      status: 'Success',
      message: 'user deleted',
    };
  } catch (err) {
    return {
      status: 'Failed',
      message: err,
    };
  }
}
