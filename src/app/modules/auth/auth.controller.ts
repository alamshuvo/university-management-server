import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.loginUser(body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'user is loged in sucessfylly',
    data: result,
  });
});

export const authController = {
  loginUser,
};
