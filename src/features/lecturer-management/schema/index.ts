import { roles } from "@/lib/settings";
import z from "zod";

export const lecturerFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nama Program Studi harus diisi'),
  employee_id: z.string().min(1, 'No. Induk Pegawai harus diisi'),
  gender: z.string().min(1, 'Gender harus diisi'),
  degree: z.string().min(1, 'Pendidikan Terakhir harus diisi'),
  entryYear: z.string().min(1, 'Tahun Masuk harus diisi'),
  personal_email: z.email({ pattern: z.regexes.rfc5322Email }),
  personal_phone: z.string(),
  avatar: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Avatar harus berupa file"
    )
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      "Ukuran maksimal 2MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Format harus JPG/PNG"
    )
    .optional(),
  majorId: z.string().min(1, 'Program Studi harus diisi'),
  email: z.email({ pattern: z.regexes.rfc5322Email }),
  password: z.string().min(5, 'Password harus min. 5 karakter'),
  role: z.enum(roles),
});

export type LecturerFormValues = z.infer<typeof lecturerFormSchema>;