import { Controller, useForm } from "react-hook-form";
import { academicPeriodFormSchema, AcademicPeriodFormValues } from "../../schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { academicState, semesterType } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { AcademicPeriod, AcademicState, SemesterType } from "../../types";

type PeriodFormProps = {
  onSubmit: (data: Omit<AcademicPeriod, "id" | "created_at" | "updated_at">) => void,
  onCancel: () => void,
};

const PeriodForm = ({
  onSubmit,
  onCancel,
}: PeriodFormProps) => {

  const form = useForm<AcademicPeriodFormValues>({
    resolver: zodResolver(academicPeriodFormSchema),
    defaultValues: {
      id: "",
      year: "",
      semester_type: "",
      academic_state: "PLANNING",
    },
  });

  function onSubmitForm(data: AcademicPeriodFormValues) {
    const formData = {
      year: parseInt(data.year),
      semester_type: data.semester_type as SemesterType,
      academic_state: data.academic_state as AcademicState,
    }
    onSubmit(formData);
  };
  // /${currentYear - 10 + i + 1}
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => `${currentYear - 10 + i}`);

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
                value={field.value}
                onValueChange={field.onChange}
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
                    <SelectItem value={year} key={year}>{year}</SelectItem>
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
                defaultValue={field.value || "PLANNING"}
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
          {/* <Button size="sm" type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button> */}
          <Button size="sm" type="submit" form="form-periods">
            Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default PeriodForm;