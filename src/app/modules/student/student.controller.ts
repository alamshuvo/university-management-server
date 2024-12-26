import { StudentServices } from './student.service';
import { catchAsync } from '../../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      sucess: true,
      message: 'Student are retrieved sucessfully',
      data: result,
    });
  }
)
const getSingleStudents = catchAsync(async (req, res) => {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      sucess: true,
      message: 'Student is retrieved sucessfully',
      data: result,
    });
  }
)

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
};
