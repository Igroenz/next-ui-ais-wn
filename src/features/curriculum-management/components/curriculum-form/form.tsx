import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Curriculum } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { curriculumFormSchema, CurriculumFormValues } from "../../schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMajors } from "@/features/major-management/hooks/useMajors";
import { usePeriods } from "@/features/period-management/hooks/usePeriods";

interface CurriculumFormProps {
  onSubmit: (data: Omit<Curriculum, "id" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<Curriculum>;
};

const CurriculumForm = ({
  onSubmit, onCancel, defaultValues
}: CurriculumFormProps) => {
  const form = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
    }
  })

  function onSubmitForm(data: CurriculumFormValues) {
    const formData = {
      name: data.name,
      majorId: data.majorId,
      academicPeriodId: data.academicPeriodId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    onSubmit(formData)
  }

  const { majors } = useMajors();
  const { periods } = usePeriods();

  return (
    <form
      id="form-assessment-model"
      onSubmit={form.handleSubmit(onSubmitForm)}
      className="space-y-6"
    >
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Kurikulum
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Nama Kurikulum..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="majorId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Program Studi
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                required
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Pilih Program Studi..." />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                    <SelectItem value={major.id} key={major.id}>{major.degree}-{major.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="academicPeriodId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Periode Akademik
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                required
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Pilih Periode Akademik..." />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem value={period.id} key={period.id}>{period.semester_type} {period.year}/{period.year + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="startDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Tanggal Mulai
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="date"
                aria-invalid={fieldState.invalid}
                placeholder="Tanggal Mulai..."
                required
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="endDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Tanggal Selesai
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="date"
                aria-invalid={fieldState.invalid}
                placeholder="Tanggal Selesai..."
                required
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Field orientation="horizontal">
          <Button size="sm" type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button size="sm" type="submit" form="form-major">
            Simpan
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default CurriculumForm;