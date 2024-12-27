import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';



// find academic semester info 
const admisionSemester = await academicSemesterModel.findById(studentData.admissionSemester)


  // set manully generated id
  if (!admisionSemester) {
    throw new Error('Admission semester not found');
  }
  userData.id =await generateStudentId(admisionSemester);
  const result = await userModel.create(userData);

 
  //create a student
  if (Object.keys(result).length) {
    //set id , _id as user
    studentData.id = result.id;
    studentData.user = result._id;
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
