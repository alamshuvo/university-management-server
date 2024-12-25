
import config from '../../config';
import { Student } from '../student/student.interface';
import {  TUser } from './user.interface';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  // set manully generated id
  userData.id = '2030100001'
  const result = await userModel.create(userData);

  //create a student
  if(Object.keys(result).length){
   //set id , _id as user
   studentData.id=result.id;
   studentData.user=result._id
  }
  return result;
};

export const userService = {
  createStudentIntoDB,
};
