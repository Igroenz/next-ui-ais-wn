import { Controller, useForm } from "react-hook-form";
import { academicPeriodFormSchema, AcademicPeriodFormValues } from "../../schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { academicState, semesterType } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { AcademicPeriod, AcademicState, SemesterType } from "../../types";
import { useEffect } from "react";

type PeriodFormProps = {
  onSubmit: (data: Omit<AcademicPeriod, "id" | "created_at" | "updated_at">) => void,
  onCancel: () => void,
  defaultValues?: Partial<AcademicPeriod>,
};

const PeriodForm = ({
  onSubmit,
  onCancel,
  defaultValues,
}: PeriodFormProps) => {

  const form = useForm<AcademicPeriodFormValues>({
    resolver: zodResolver(academicPeriodFormSchema),
    defaultValues: {
      id: "",
      year: defaultValues?.year || 0,
      semester_type: defaultValues?.semester_type || "",
      academic_state: defaultValues?.academic_state || "PLANNING",
    },
  });

  // Update form when defaultValues changes (for edit mode)
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id: defaultValues.id || "",
        year: defaultValues.year || 0,
        semester_type: defaultValues.semester_type || "",
        academic_state: defaultValues.academic_state || "PLANNING",
      });
    } else {
      form.reset({
        id: "",
        year: 0,
        semester_type: "",
        academic_state: "PLANNING",
      });
    }
  }, [defaultValues, form]);

  function onSubmitForm(data: AcademicPeriodFormValues) {
    const formData = {
      year: data.year,
      semester_type: data.semester_type as SemesterType,
      academic_state: data.academic_state as AcademicState,
    }
    onSubmit(formData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => ({ value: currentYear - 10 + i, label: `${currentYear - 10 + i}/${currentYear - 10 + i + 1}` }));

  return (
    <form
      id="form-periods"
      onSubmit={form.handleSubmit(onSubmitForm)}
      className="space-y-6"
    >
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1">
        <Controller
          name="year"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Tahun Akademik
              </FieldLabel>
              <Select
                name={field.name}
                value={String(field.value)}
                onValueChange={(val) => field.onChange(Number(val))}
                required
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Pilih Tahun Akademik" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem value={String(year.value)} key={year.value}>{year.label}</SelectItem>
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
          name="semester_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Tipe Semester
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
                  <SelectValue placeholder="Pilih Tipe Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesterType.map((type) => (
                    <SelectItem value={type} key={type}>{type}</SelectItem>
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
          name="academic_state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Status Period Academic
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
                  <SelectValue placeholder={"Pilih Status"} />
                </SelectTrigger>
                <SelectContent>
                  {academicState.map((state) => (
                    <SelectItem value={state} key={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <Button size="sm" type="submit" form="form-periods">
            Simpan
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default PeriodForm;