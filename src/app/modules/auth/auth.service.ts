import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TLoginUSer } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUSer) => {
  //console.log(payload);
  //checking if the user is exisit
  //const isUserExist = await userModel.findOne({ id: payload?.id })

  const userExist = await userModel.isUserExistsByCustomId(payload?.id);
  console.log(userExist);

  if (!userExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this user is not found in database',
    );
  }
  // checking if the user is already delete
  const isUserDelete = userExist?.isDeleted;
  if (isUserDelete) {
    throw new AppError(StatusCodes.FORBIDDEN, 'this user is deleted');
  }
  //checking if the user is blocked
  const isUserBlocked = userExist?.status?.toString();
  if (isUserBlocked === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'this user is blocked');
  }

  // checking if the password is correct

  const isPasswordMatched = await userModel.isPasswordMatched(
    payload?.password,
    userExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.NOT_FOUND, 'password is not matched');
  }

  //Access Granted: Send acess token and refresh token

  return {};
};

export const AuthService = {
  loginUser,
};
