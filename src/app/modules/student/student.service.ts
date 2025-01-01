import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';
import QueryBuilder from '../../builder/quearyBuilder';
import { studentSearchAbleFields } from './student.const';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const quearyObj = { ...query };
  // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAdress'];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuary = StudentModel.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // //Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete quearyObj[el]);

  // const filterQuary = searchQuary
  //   .find(quearyObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepertment',
  //     populate: {
  //       path: 'academicFaculties',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQueary = filterQuary.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuary = sortQueary.skip(skip);

  // const limitQuary = paginateQuary.limit(limit);

  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const selectQueary = await limitQuary.select(fields);
  const studentQuery = new QueryBuilder(StudentModel.find().populate('admissionSemester')
    .populate({
     path: 'academicDepertment',
      populate: {
        path: 'academicFaculties',
      }}), query).search(studentSearchAbleFields).filter().sort().paginate().fields();
  const result = await studentQuery.modelQuery
  return result
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findById(id )
    .populate('admissionSemester')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculties',
      },
    });
  return result;
};

const deleteSingleStudentsFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await StudentModel.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'faild to delete student');
    }

  const userId = result.user;

    const deletedUser = await userModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'faild to delete users');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

const updateStudentFromDb = async (id: string, payload: Partial<Student>) => {
  const { name, gurdien, localGurdien, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (gurdien && Object.keys(gurdien).length) {
    for (const [key, value] of Object.entries(gurdien)) {
      modifiedUpdatedData[`gurdien.${key}`] = value;
    }
  }

  if (localGurdien && Object.keys(localGurdien).length) {
    for (const [key, value] of Object.entries(localGurdien)) {
      modifiedUpdatedData[`localGurdien.${key}`] = value;
    }
  }
  const result = await StudentModel.findByIdAndUpdate(
     id ,
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );
  return result;
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDb,
  updateStudentFromDb,
};
