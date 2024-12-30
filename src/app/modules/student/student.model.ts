import { Schema, model, connect } from 'mongoose';
import { Gurdien, LocalGuardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const gurdienSchema = new Schema<Gurdien>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGurdienSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
});
const studentSchema = new Schema<Student>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id must be added'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    requred: true,
  },
  dateOfBirth: { type: Date },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAdress: { type: String, required: true },
  permanentAdress: { type: String, required: true },
  gurdien: gurdienSchema,
  localGurdien: localGurdienSchema,
  profileImage: { type: String },
  admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  academicDepertment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepertment',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
