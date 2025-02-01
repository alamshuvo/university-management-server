import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TLoginUSer } from './auth.interface';
import bcrypt from 'bcrypt';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../../utils/sendEmail';

const loginUser = async (payload: TLoginUSer) => {
  //console.log(payload);
  //checking if the user is exisit
  //const isUserExist = await userModel.findOne({ id: payload?.id })

  const userExist = await userModel.isUserExistsByCustomId(payload?.id);
  console.log(userExist, payload.id);

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

  const jwtPayload = {
    userId: userExist?.id,
    role: userExist?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_acess_secret as string,
    config.jwt_acess_expieres as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_referesh_expiers as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userExist?.needsPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const userExist = await userModel.isUserExistsByCustomId(user?.userId);

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
    payload?.oldPassword,
    userExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.NOT_FOUND, 'password is not matched');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_round),
  );

  const result = await userModel.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid

  const decoded = verifyToken(token, config.jwt_refresh_secret as string) as JwtPayload;
  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status?.type;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangeAt &&
    userModel.isJWTIssuedBeforePasswordChange(
      user.passwordChangeAt.type,
      iat as number,
    )
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_acess_secret as string,
    config.jwt_acess_expieres as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (id: string) => {
  const user = await userModel.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }
  const userStatus = user?.status.type;
  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_acess_secret as string,
    '10m',
  );

  const resetUiLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user?.email, resetUiLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await userModel.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }
  const userStatus = user?.status.type;
  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = verifyToken(token, config.jwt_acess_secret as string) as JwtPayload;

  console.log(decoded);
  if (payload.id !== decoded.userId ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
  }
  const hashedNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  )
  await userModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: hashedNewPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  )


};
export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
