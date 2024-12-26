
import { userService } from './user.serivces';
import { catchAsync } from '../../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
    //send response
    const { password, student: studentData } = req.body;
    //will call service function to send this data
    const result = await userService.createStudentIntoDB(password, studentData);
    res.status(200).json({
      sucess: true,
      message: 'Student is Created Sucessfully',
      data: result,
    });
  }
)

export const UserControllers = {
  createStudent,
};
