import { Router } from 'express';

import {
  insertUser,
  updateUserById,
  getAllUsers,
  findUserById,
  deleteUserById,
} from '../Controller/user.route';
import express from 'express';

const userRoutes = Router();
userRoutes.post('/', insertUser);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', findUserById);
userRoutes.put('/:id', updateUserById);
userRoutes.delete('/:id', deleteUserById);

export default userRoutes;
