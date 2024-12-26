import { StudentServices } from './student.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'student are retrived sucessfully',
    data: result,
  });
});
const getSingleStudents = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single student retrived sucessfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
};
