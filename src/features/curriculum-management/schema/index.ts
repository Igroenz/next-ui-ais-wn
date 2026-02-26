import z from "zod";

export const curriculumFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Kurikulum harus diisi'),
  majorId: z.string().min(1, 'Pilih Prodi'),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  academicPeriodId: z.string().min(1, 'Pilih Periode Akademik'),
});

export type CurriculumFormValues = z.infer<typeof curriculumFormSchema>;

export const curriculumDetailFormSchema = z.object({
  id: z.string().optional(),
  curriculumId: z.string().min(1, 'Kurikulum tidak ada'),
  semester: z.coerce.number<number>().min(1, "Semester harus diisi"),
  courses: z.array(z.string()).min(1, 'Pilih minimal satu mata kuliah'),
});

export type CurriculumDetailFormValues = z.infer<typeof curriculumDetailFormSchema>;