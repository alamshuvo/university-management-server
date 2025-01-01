import { StudentServices } from './student.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'student are retrived sucessfully',
    data: result,
  });
});
const getSingleStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentsFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single student retrived sucessfully',
    data: result,
  });
});
const deleteStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteSingleStudentsFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single student deleted sucessfully',
    data: result,
  });
});

const updateStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { student } = req.body;
  const result = await StudentServices.updateStudentFromDb(id, student);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single student deleted sucessfully',
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
  updateStudents,
};
