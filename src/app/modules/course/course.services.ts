import mongoose from 'mongoose';
import QueryBuilder from '../../builder/quearyBuilder';
import { searchAbleFields } from './course.const';
import { TCourse, TCourseFaculty } from './course.interface';
import { course, courseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await course.create(payload);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuary = new QueryBuilder(
    course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuary.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await course
    .findById(id)
    .populate('preRequisiteCourses.course');
  return result;
};
const deleteCourseFromDb = async (id: string) => {
  const result = await course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...reminingCourseData } = payload;
  // step -1 basic course info update
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatedBasicCourseInfo = await course.findByIdAndUpdate(
      id,
      reminingCourseData,
      { new: true, runValidators: true, session },
    );
    if (!updatedBasicCourseInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'faild to update course');
    }
    //check if there is any preRequisiteCourses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filterout the deleted feild from preRequisiteCourses
      const deletedpreRequisite = preRequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((el) => el.course);
      const deletedPrerequisiteCourses = await course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedpreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPrerequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'faild to update course');
      }
      // filter out the new course feild
      const newPrerequisiteCourses = preRequisiteCourses?.filter(
        (item) => item.course && !item.isDeleted,
      );
      const newPrerequisiteCoursesData = await course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisiteCourses } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPrerequisiteCoursesData) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'faild to update course');
      }
      const result = await course
        .findById(id)
        .populate('preRequisiteCourses.course');
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'faild to update course');
  }
};

const assignFacultieswithCourseIntoDb = async (id: string, payload: Partial<TCourseFaculty>) => {
  const result = await courseFaculty.findByIdAndUpdate(
    id,
    { course: id, 
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultieswithCourseIntoDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await courseFaculty.findByIdAndUpdate(
      id,
      { 
      $pull: { faculties: { $in: payload } },
      },
      {

        new: true,
      }
    );
    return result;
  };
export const courseService = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseFromDb,
  updateCourse,
  assignFacultieswithCourseIntoDb,
  removeFacultieswithCourseIntoDb
};
