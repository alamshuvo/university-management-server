import { Schema, model, connect, Types, Date } from 'mongoose';
export type Gurdien = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  adress: string;
};
export type Student = {
  id: string;
  user: Types.ObjectId;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  contactNo: string;
  emergencyNo: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAdress: string;
  permanentAdress: string;
  gurdien: Gurdien;
  localGurdien: LocalGuardian;
  profileImage?: string;
  admissionSemester:Types.ObjectId,
  isDeleted:boolean
};
