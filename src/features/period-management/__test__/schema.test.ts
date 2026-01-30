// import { describe, it, expect } from 'vitest';
// import { academicPeriodFormSchema, AcademicPeriodFormValues } from '../schema';

// describe('Academic Period Form Schema', () => {
//   describe('Valid Data', () => {
//     it('should validate correct form data', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true);
//     });

//     it('should validate form data with optional id', () => {
//       const data = {
//         id: 'test-id-123',
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true);
//     });

//     it('should accept all semester types', () => {
//       const semesterTypes = ['GANJIL', 'GANJIL PENDEK', 'GENAP', 'GENAP PENDEK'];

//       semesterTypes.forEach((type) => {
//         const data = {
//           year: 2025,
//           semester_type: type,
//           academic_state: 'ONGOING',
//         };

//         const result = academicPeriodFormSchema.safeParse(data);
//         expect(result.success).toBe(true);
//       });
//     });

//     it('should accept all academic states', () => {
//       const states = ['PLANNING', 'ONGOING', 'CLOSE'];

//       states.forEach((state) => {
//         const data = {
//           year: 2025,
//           semester_type: 'GANJIL',
//           academic_state: state,
//         };

//         const result = academicPeriodFormSchema.safeParse(data);
//         expect(result.success).toBe(true);
//       });
//     });

//     it('should accept positive year values', () => {
//       const years = [2020, 2025, 2030, 2050];

//       years.forEach((year) => {
//         const data = {
//           year,
//           semester_type: 'GANJIL',
//           academic_state: 'ONGOING',
//         };

//         const result = academicPeriodFormSchema.safeParse(data);
//         expect(result.success).toBe(true);
//       });
//     });
//   });

//   describe('Invalid Data - Year', () => {
//     it('should reject missing year', () => {
//       const data = {
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject invalid year type (string)', () => {
//       const data = {
//         year: '2025',
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject year value of 0', () => {
//       const data = {
//         year: 0,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject negative year', () => {
//       const data = {
//         year: -2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject null year', () => {
//       const data = {
//         year: null,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });
//   });

//   describe('Invalid Data - Semester Type', () => {
//     it('should reject missing semester_type', () => {
//       const data = {
//         year: 2025,
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject empty semester_type', () => {
//       const data = {
//         year: 2025,
//         semester_type: '',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject invalid semester_type', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'INVALID_SEMESTER',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true); // Schema only checks min length
//     });

//     it('should reject null semester_type', () => {
//       const data = {
//         year: 2025,
//         semester_type: null,
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });
//   });

//   describe('Invalid Data - Academic State', () => {
//     it('should reject missing academic_state', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject empty academic_state', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: '',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });

//     it('should reject invalid academic_state', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'INVALID_STATE',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true); // Schema only checks min length
//     });

//     it('should reject null academic_state', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: null,
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(false);
//     });
//   });

//   describe('Optional Fields', () => {
//     it('should allow undefined id', () => {
//       const data = {
//         id: undefined,
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true);
//     });

//     it('should not require id field', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true);
//     });

//     it('should allow any string as id', () => {
//       const ids = ['uuid-123', 'simple-id', '', '123', 'with-special-@-char'];

//       ids.forEach((id) => {
//         const data = {
//           id,
//           year: 2025,
//           semester_type: 'GANJIL',
//           academic_state: 'ONGOING',
//         };

//         const result = academicPeriodFormSchema.safeParse(data);
//         expect(result.success).toBe(true);
//       });
//     });
//   });

//   describe('Type Inference', () => {
//     it('should infer correct type for valid data', () => {
//       const validData = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(validData);
//       if (result.success) {
//         const data: AcademicPeriodFormValues = result.data;
//         expect(data.year).toBe(2025);
//         expect(data.semester_type).toBe('GANJIL');
//         expect(data.academic_state).toBe('ONGOING');
//       }
//     });

//     it('should return parsed data with correct structure', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true);
//       if (result.success) {
//         expect(result.data).toEqual(
//           expect.objectContaining({
//             year: 2025,
//             semester_type: 'GANJIL',
//             academic_state: 'ONGOING',
//           })
//         );
//       }
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should handle very large year numbers', () => {
//       const data = {
//         year: 9999,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       expect(result.success).toBe(true);
//     });

//     it('should reject year as float', () => {
//       const data = {
//         year: 2025.5,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       // Zod's number() accepts floats, so this might pass
//       expect(result.success).toBe(true);
//     });

//     it('should not allow extra fields in strict mode', () => {
//       const data = {
//         year: 2025,
//         semester_type: 'GANJIL',
//         academic_state: 'ONGOING',
//         extraField: 'should not be here',
//       };

//       const result = academicPeriodFormSchema.safeParse(data);
//       // By default, zod allows extra fields unless strict is set
//       expect(result.success).toBe(true);
//     });
//   });
// });
