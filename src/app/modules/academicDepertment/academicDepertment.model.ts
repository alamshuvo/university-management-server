import { model, Schema } from 'mongoose';
import TAcademicDepertment from './academicDepertment.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const academicDepertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculties: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepertmentSchema.pre('save', async function (next) {
  const isDepertmentExist = await AcademicDepertment.findOne({
    name: this.name,
  });
  if (isDepertmentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'This Depertment is already Exist',
    );
  }
  next();
});

academicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepertmentExist = await AcademicDepertment.findOne({
    query,
  });
  if (!isDepertmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Depertment does not Exist');
  }
  next();
});

export const AcademicDepertment = model<TAcademicDepertment>(
  'AcademicDepertment',
  academicDepertmentSchema,
);
