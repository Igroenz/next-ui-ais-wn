import z from "zod";

export const academicPeriodFormSchema = z.object({
  id: z.string().optional(),
  // year: z.string().min(1, 'Tahun Akademik harus diisi'),
  year: z.number().min(1, 'Tahun Akademik harus diisi'),
  semester_type: z.string().min(1, 'Tipe Semester harus diisi'),
  academic_state: z.string().min(1, 'Status Periode harus diisi'),
});

export type AcademicPeriodFormValues = z.infer<typeof academicPeriodFormSchema>;