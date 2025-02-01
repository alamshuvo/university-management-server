import { userService } from './user.serivces';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

const createStudent = catchAsync(async (req, res) => {
  //send response
  const { password, student: studentData } = req.body;

  //will call service function to send this data
  const result = await userService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'student created sucessfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await userService.createFacultyIntoDb(password, facultyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'faculty created sucessfully',
    data: result,
  });
});


const getMe = catchAsync(async (req, res) => {
 const token = req.headers.authorization;
 if (!token) {
  throw new AppError(StatusCodes.NOT_FOUND,"token not found")
 }




  const result = await userService.getMe(token);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'get Me sucessfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  getMe
};
