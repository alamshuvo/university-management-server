import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //send response
    const student = req.body.student;
    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(student);
    res.status(200).json({
      sucess: true,
      message: 'Student is Created Sucessfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      sucess: true,
      message: 'Student are retrieved sucessfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      sucess: true,
      message: 'Student is retrieved sucessfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
