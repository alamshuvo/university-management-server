import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: Number;
  credits: Number;
  preRequisiteCourses: [TPreRequisiteCourses];
  isDeleted: boolean;
};


export type TCourseFaculty = {
    course:Types.ObjectId;
    faculties:[Types.ObjectId];
}