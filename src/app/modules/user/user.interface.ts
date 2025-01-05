import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: {
    type: Boolean;
    default: true;
  };
  role: {
    type: String;
    enum: ['admin' | 'student' | 'faculty'];
  };
  isDeleted: {
    type: Boolean;
    default: false;
  };
  status: {
    type: String;
    enum: ['in-progress' | 'blocked'];
    default: 'in-progress';
  };
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  //isDeleted(isDeleted:'false'|'true'):Promise<TUser>
}

export type TNewUser = {
  role: ['student' | 'admin' | 'faculty'];
  password: string;
  id: string;
};
