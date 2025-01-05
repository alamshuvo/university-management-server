import { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { userModel } from '../modules/user/user.model';




const auth = (...requiredRole : TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    // check if the token is send from the client
    if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED,"you are not authorized")
    }
    // check if the token is valid 
   jwt.verify(token,(config.jwt_acess_secret as string),async function(err,decode){
   if (err) {
    
    throw new AppError(StatusCodes.UNAUTHORIZED,"you are  not authorized")
   }
   const {userId,role,iat}=decode as JwtPayload

   // checkking the user is exist
   const user = await userModel.isUserExistsByCustomId(userId)
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
  const a = user?.passwordChangeAt?.type;
 if (a && userModel.isJWTIssuedBeforePasswordChange(a, iat as number)) {
    throw new AppError(StatusCodes.UNAUTHORIZED,"you are not authorized")
 }



   if (requiredRole && !requiredRole.includes(role)) {
    throw new AppError(StatusCodes.UNAUTHORIZED,"you are not authorized")
   }
  req.user = decode as JwtPayload
  next()
   })
    
  })
 
};
export default auth;
