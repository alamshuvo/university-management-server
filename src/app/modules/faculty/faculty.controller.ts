import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { FacultyServices } from './faculty.services';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {

  console.log(req.cookies);
  
  const result = await FacultyServices.getAllFacultieFromDb(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDb(id, faculty);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDb(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
