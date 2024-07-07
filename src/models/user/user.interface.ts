import Joi from 'joi';
import { Gender } from './user.enum';

export interface UserDocument {
  firstname: string;
  lastname: string;
  nationalID: string;
  phonenumber: string;
  gender: Gender;
  telephone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchemaValidate = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  nationalID: Joi.string().required(),
  phonenumber: Joi.string().required(),
  gender: Joi.string().required(),
  telephone: Joi.string(),
  address: Joi.string().required(),
});
