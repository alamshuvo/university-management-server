import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { AcademicDepertment } from '../academicDepertment/academicDepertment.model';
import { STATUS_CODES } from 'http';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};
  console.log(studentData);
  
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester info
  const admisionSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  );

  // set manully generated id
  if (!admisionSemester) {
    throw new Error('Admission semester not found');
  }

  // transation and rollback
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admisionSemester);
    const result = await userModel.create([userData], { session });

    //create a student
    if (!result.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create user');
    }
    //set id , _id as user
    studentData.id = result[0].id;
    studentData.user = result[0]._id;

    //transation 2

    const newStudent = await StudentModel.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create student if block');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student rollback');
  }
};


const createFacultyIntoDb = async (password:String, payload)=>{
  const userData: Partial<TUser> = {};
  //password is not given use default password

  userData.password = password || (config.default_password as string);
  //set role
  userData.role = 'faculty';
  //find academic depertment info 
  const academicDepertment = await AcademicDepertment.findById(payload.academicDepertment)
  if (!academicDepertment) {
    throw new AppError(StatusCodes.NOT_FOUND,"Academic Depertment not found ")
  };
  const session =await mongoose.startSession();
  try {
    session.startTransaction();
    
  } catch (error) {
    
  }
}

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDb
};
