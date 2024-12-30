import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterintoDb(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'academic Semester created Sucessfully',
    data: result,
  });
});

const getAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAcademicSemesterIntoDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'all semester are retrived sucessfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterIntoDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single semester are retrived sucessfully',
    data: result,
  });
});

const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result =
    await academicSemesterServices.updateSingleAcademicSemesterIntoDb(
      id,
      payload,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single semester are updated sucessfully sucessfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
