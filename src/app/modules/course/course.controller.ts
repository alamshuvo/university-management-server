import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { courseService } from './course.services';

const createCourses = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDb(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'courses created Sucessfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourseFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'course are retrived sucessfully',
    data: result,
  });
});

const getSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourseFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single courses retrived sucessfully',
    data: result,
  });
});

const deleteSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourseFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single courses  deleted sucessfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await courseService.updateCourse(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'update coures sucessfully',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseService.assignFacultieswithCourseIntoDb(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'update coures sucessfully',
    data: result,
  });
});

const removeFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseService.removeFacultieswithCourseIntoDb(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'remove faculties sucessfully',
    data: result,
  });
});
export const courseController = {
  createCourses,
  getAllCourses,
  getSingleCourses,
  deleteSingleCourses,
  updateCourse,
  assignFaculties,
  removeFaculties,
};
