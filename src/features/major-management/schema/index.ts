import z from "zod";
import { DEGREE } from "../types";
import { degree } from "@/lib/settings";

export const majorFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nama Program Studi harus diisi'),
  code: z.string().min(1, 'Kode Program Studi harus diisi'),
  degree: z.enum(degree),
});

export type MajorFormValues = z.infer<typeof majorFormSchema>;