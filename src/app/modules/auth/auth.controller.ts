import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';


const loginUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.loginUser(body);

  const {refreshToken,accessToken,needsPasswordChange}=result ;
  res.cookie('refreshToken',refreshToken,{
    secure:config.node_env === 'production',
    httpOnly:true
  })
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'user is loged in sucessfylly',
    data: {
      accessToken,needsPasswordChange
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const body = req.body;
  console.log(req.user,req.body);
  
  const result = await AuthService.changePassword(req.user,req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'user change password sucessfylly',
    data: null,
  });
});


const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken
};
