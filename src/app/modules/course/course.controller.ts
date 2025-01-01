import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { courseService } from "./course.services";


const createCourses = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDb(
    req.body,
  );
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

const getSingleCourses= catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await courseService.getSingleCourseFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single courses retrived sucessfully',
    data: result,
  });
});


const deleteSingleCourses= catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseService.deleteCourseFromDb(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      sucess: true,
      message: 'single courses  deleted sucessfully',
      data: result,
    });
  });

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const result = await AcademicFacultyServices.updatSingleAcademicFacultyFromDb(
//     id,
//     payload,
//   );
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     sucess: true,
//     message: 'update single academic faculty ',
//     data: result,
//   });
// });
export const courseController = {
    createCourses,
    getAllCourses,
    getSingleCourses,
    deleteSingleCourses
    // updateAcademicFaculty,
};
