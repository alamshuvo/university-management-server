import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAdress: z.string(),
      permanentAdress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepertment: z.string(),
      // profileImg: z.string(),
    }),
  }),
});

export const createStudentValidationSchemaOptional = z.object({
  body: z
    .object({
      password: z.string().max(20).optional(), // Password is optional
      student: z
        .object({
          name: userNameValidationSchema,
          gender: z.enum(['male', 'female', 'other']).optional(),
          dateOfBirth: z.string().optional(),
          email: z.string().email().optional(),
          contactNo: z.string().optional(),
          emergencyNo: z.string().optional(),
          bloogGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          presentAdress: z.string().optional(),
          permanentAdress: z.string().optional(),
          guardian: guardianValidationSchema,
          localGuardian: localGuardianValidationSchema,
          admissionSemester: z.string().optional(),
          academicDepertment: z.string().optional(),
          profileImg: z.string().optional(),
        })
        .partial(), // Makes all fields in the `student` object optional
    })
    .partial(), // Makes all fields in the `body` object optional
});

export const studentValidations = {
  createStudentValidationSchema,
  createStudentValidationSchemaOptional,
};
