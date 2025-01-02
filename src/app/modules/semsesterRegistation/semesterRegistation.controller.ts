import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createSemsesterRegistation = catchAsync(async (req, res) => {
  const result = await {};
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'create semesterRegistation sucessfully',
    data: result,
  });
});

const getAllSemsesterRegistation = catchAsync(async (req, res) => {
  const result = await {};
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'get all semester sucessfully',
    data: result,
  });
});

const getSingleSemsesterRegistation = catchAsync(async (req, res) => {
  const result = await {};
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'get Single semester sucessfully',
    data: result,
  });
});

const updateSemsesterRegistation = catchAsync(async (req, res) => {
  const result = await {};
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'update semester sucessfully',
    data: result,
  });
});

export const SemesterController = {
  createSemsesterRegistation,
  getAllSemsesterRegistation,
  getSingleSemsesterRegistation,
  updateSemsesterRegistation,
};
