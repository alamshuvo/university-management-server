import { model, Schema, Types } from 'mongoose';
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Titile must be required'],
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, 'Prefix must be required'],
  },
  code: {
    type: Number,
    required: [true, 'Code must be required'],
    trim: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const course = model<TCourse>('course', courseSchema);
const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'course',
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
  });
  
  export const courseFaculty = model<TCourseFaculty>('courseFaculty', courseFacultySchema);