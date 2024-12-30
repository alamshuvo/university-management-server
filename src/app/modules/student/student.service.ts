import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculties',
      },
    });
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
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
    const result = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'faild to delete student');
    }
    const deletedUser = await userModel.findOneAndUpdate(
      { id },
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
  const result = await StudentModel.findOneAndUpdate(
    { id },
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
