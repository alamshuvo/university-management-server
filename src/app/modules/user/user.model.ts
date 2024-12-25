import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { boolean } from 'zod';

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
    default: 'in-progress',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const userModel = model<TUser>('user', userSchema);
