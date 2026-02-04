import z from "zod";
import { roles } from "@/lib/settings";

export const operatorFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nama Program Studi harus diisi'),
  employee_id: z.string().min(1, 'No. Induk Pegawai harus diisi'),
  department: z.string().min(1, 'Bagian/Departement harus diisi'),
  email: z.email({ pattern: z.regexes.rfc5322Email }),
  password: z.string().min(5, 'Password harus min. 5 karakter'),
  role: z.enum(roles),
});

export type OperatorFormValues = z.infer<typeof operatorFormSchema>;