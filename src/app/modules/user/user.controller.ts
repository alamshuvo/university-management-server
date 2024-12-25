import { userService } from './user.serivces';

const createStudent = async (req: Request, res: Response) => {
  try {
    //send response
    const { password, student: studentData } = req.body;
    //will call service function to send this data
    const result = await userService.createStudentIntoDB(password, studentData);
    res.status(200).json({
      sucess: true,
      message: 'Student is Created Sucessfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserControllers = {
  createStudent,
};
