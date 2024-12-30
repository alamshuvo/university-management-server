import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AcademicDepertmentServices } from './academicDepertment.service';

const createAcademicDepertment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepertmentServices.createAcademicDepertmentIntoDb(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'academic depertment created Sucessfully',
    data: result,
  });
});

const getAllAcademicDepertment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepertmentServices.getAllAcademicDepertmentFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'academic depertment retrived sucessfully',
    data: result,
  });
});

const getSingleAcademicDepertment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicDepertmentServices.getSingleAcademicDepertmentFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single depertment faculty retrived sucessfully',
    data: result,
  });
});

const updateAcademicDepertment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result =
    await AcademicDepertmentServices.updatSingleAcademicDepertmentFromDb(
      id,
      payload,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'update single academic depertment ',
    data: result,
  });
});
export const academicDepertmentController = {
  createAcademicDepertment,
  getAllAcademicDepertment,
  getSingleAcademicDepertment,
  updateAcademicDepertment,
};
