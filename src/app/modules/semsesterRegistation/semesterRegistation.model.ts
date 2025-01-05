import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistation } from './semesterRegistation.interface';
import { semesterRegistationStatus } from './semesterRegistation.constant';

const semesterRegistationSchema = new Schema<TSemesterRegistation>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  { timestamps: true },
);

export const semesterRegistation = mongoose.model<TSemesterRegistation>(
  'semesterRegistation',
  semesterRegistationSchema,
);
