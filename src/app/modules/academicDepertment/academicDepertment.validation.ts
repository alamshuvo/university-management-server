import { z } from 'zod';

const academicDepertmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Depertment must be a string',
      required_error: 'Name is Required',
    }),
    academicFaculties: z.string({
      invalid_type_error: 'Academic Faculties must be a string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateAacademicDepertmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Depertment must be a string',
        required_error: 'Name is Required',
      })
      .optional(),
    academicFaculties: z
      .string({
        invalid_type_error: 'Academic Faculties must be a string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepertmentValidation = {
  academicDepertmentValidation,
  updateAacademicDepertmentValidation,
};
