import {
  createUser,
  getUsers,
  findUser,
  deleteUser,
  updateUser,
} from './user.service';
import { Request, Response } from 'express';
import { UserSchema } from '../models/user/user.schema';
import { UserSchemaValidate } from '../models/user/user.interface';
import { Console } from 'console';

export async function insertUser(req: Request, res: Response) {
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nationalID: req.body.nationalID,
    phonenumber: req.body.phonenumber,
    gender: req.body.gender,
    telephone: req.body.telephone,
    address: req.body.address,
  };
  const { error, value } = UserSchemaValidate.validate(data);
  if (error) {
    res.status(400).send({ status: 'Failed', message: error.message });
  } else {
    const service = await createUser(data);
    res.status(201).send(service);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const service = await getUsers();
    res.status(201).send(service);
  } catch (err) {
    res.send(err);
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const service = await findUser(req.params.id);
    res.status(201).send(service);
  } catch (err) {
    res.send(err);
  }
}

export async function updateUserById(req: Request, res: Response) {
  try {
    const service = await updateUser(req.params.id, req.body);
    res.status(201).send(service);
  } catch (err) {
    res.send(err);
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const service = await deleteUser(req.params.id);
    res.status(201).send(service);
  } catch (err) {
    res.send(err);
  }
}
