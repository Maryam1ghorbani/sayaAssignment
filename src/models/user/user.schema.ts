import { Schema, model } from 'mongoose';
import { UserDocument } from './user.interface';
import { Gender } from './user.enum';

export const UserSchema = new Schema<UserDocument>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    nationalID: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    telephone: String,
    address: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'User',
    timestamps: true,
  },
);

export const User = model<UserDocument>('User', UserSchema);
