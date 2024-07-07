import { Gender } from '../models/user/user.enum';

export interface CreateUserInput {
  firstname: string;
  lastname: string;
  nationalID: string;
  phonenumber: string;
  gender: Gender;
  telephone: string;
  address: string;
}

export interface FindUserInput {
  _id: string;
}

export interface UpdateUserInput {
  firstname: string;
  lastname: string;
  nationalID: string;
  phonenumber: string;
  gender: Gender;
  telephone: string;
  address: string;
}

export interface DeleteUserInput {
  _id: string;
}
