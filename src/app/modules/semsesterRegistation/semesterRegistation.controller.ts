import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { SemesterRegistationService } from './semesterRegistation.service';

const createSemsesterRegistation = catchAsync(async (req, res) => {
  const payload = req.body;
  const result =
    await SemesterRegistationService.createSemesterRegistataionIntoDb(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'create semesterRegistation sucessfully',
    data: result,
  });
});

const getAllSemsesterRegistation = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await SemesterRegistationService.getAllSemsesterRegistation(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'get all semester sucessfully',
    data: result,
  });
});

const getSingleSemsesterRegistation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistationService.getSingleSemsesterRegistation(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'get Single semester sucessfully',
    data: result,
  });
});

const updateSemsesterRegistation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await SemesterRegistationService.updateSemesterRegistation(
    id,
    body,
  );
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
