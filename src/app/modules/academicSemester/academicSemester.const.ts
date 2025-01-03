import {
  Month,
  TAcademicSemesterCode,
  TAcademicSemesterName,
} from './academicSemester.interface';

export const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];
export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];
export const months: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterNameCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
