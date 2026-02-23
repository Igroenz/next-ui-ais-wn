import z from "zod";

export const assessmentComponentFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Komponen Nilai harus diisi'),
  acronym: z.string().min(1, 'Akronim Komponent Nilai harus diisi'),
  description: z.string().optional(),
});

export type AssessmentComponentFormValues = z.infer<typeof assessmentComponentFormSchema>;

export const courseTypeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tipe Mata Kuliah harus diisi'),
  description: z.string().optional(),
});

export type CourseTypeFormValues = z.infer<typeof courseTypeFormSchema>;

export const assessmentModelFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Model Penilaian harus diisi'),
  description: z.string().optional(),
  assessmentModelComponent: z.array(
    z.object({
      assessmentComponentId: z.string().min(1, 'Harus diisi'),
      percentage: z.coerce.number<number>().min(1, "Harus 1 - 100 %").max(100, "Harus 1 - 100 %"),
      sort_order: z.coerce.number<number>().min(1, "Harus diisi")
    })
  )
    .min(1, "Pilih minimal satu komponen nilai")
    .superRefine((component, ctx) => {
      // Cek Duplikat assessmentComponentId
      const mapId = new Map();
      component.forEach((item, index) => {
        if (!mapId.has(item.assessmentComponentId)) {
          mapId.set(item.assessmentComponentId, []);
        };
        mapId.get(item.assessmentComponentId)!.push(index)
      });

      for (const [, indices] of mapId.entries()) {
        if (indices.length > 1) {
          indices.forEach((i: any) => {
            ctx.addIssue({
              code: 'custom',
              message: "Data duplikat",
              path: [i, "assessmentComponentId"],
            });
          });
        }
      }

      // Cek Duplikat sort_order
      const mapSort = new Map();
      component.forEach((item, index) => {
        if (!mapSort.has(item.sort_order)) {
          mapSort.set(item.sort_order, []);
        };
        mapSort.get(item.sort_order)!.push(index)
      });

      for (const [, indices] of mapSort.entries()) {
        if (indices.length > 1) {
          indices.forEach((i: any) => {
            ctx.addIssue({
              code: 'custom',
              message: "Data duplikat",
              path: [i, "sort_order"],
            });
          });
        }
      }

      // Cek total persentase
      const total = component.reduce((sum, c) => sum + c.percentage, 0);
      if (total !== 100) {
        component.forEach((_, i) => {
          ctx.addIssue({
            code: 'custom',
            message: "Total harus 100%",
            path: [i, "percentage"],
          });
        });
      }
    })
});

export type AssessmentModelFormValues = z.infer<typeof assessmentModelFormSchema>;

export const courseFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nama Mata Kuliah harus diisi'),
  credit: z.coerce.number<number>().min(1, "SKS harus diisi"),
  code: z.string().min(1, 'Kode Mata Kuliah harus diisi'),
  majorId: z.string().min(1, 'Prodi harus diisi'),
  assessmentModelId: z.string().min(1, 'Model Penilaian harus diisi'),
  courseTypeId: z.coerce.number<number>().min(1, "Tipe Mata Kuliah harus diisi"),
  isPKL: z.boolean(),
  isTA: z.boolean(),
  predecessorId: z.string().optional(),
})

export type CourseFormValues = z.infer<typeof courseFormSchema>