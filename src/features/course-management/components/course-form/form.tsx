import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Course, CourseType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { courseFormSchema, CourseFormValues, courseTypeFormSchema, CourseTypeFormValues } from "../../schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMajors } from "@/features/major-management/hooks/useMajors";
import { useAssessments } from "../../hooks/useAssessments";
import { useCoursesType } from "../../hooks/useCourseType";

interface CourseFormProps {
  onSubmit: (data: Omit<Course, "id" | "validFrom" | "validTo" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<Course>;
};

const CourseForm = ({
  onSubmit, onCancel, defaultValues
}: CourseFormProps) => {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      code: defaultValues?.code,
      credit: defaultValues?.credit,
      majorId: defaultValues?.majorId,
      courseTypeId: defaultValues?.courseTypeId ?? 1,
      assessmentModelId: defaultValues?.assessmentModelId,
      predecessorId: defaultValues?.predecessorId,
    }
  })

  const { majors } = useMajors();
  const { assessment } = useAssessments();
  const { courseTypes } = useCoursesType();

  function onSubmitForm(data: CourseFormValues) {
    const formData = {
      name: data.name,
      code: data.code,
      credit: data.credit,
      majorId: data.majorId,
      courseTypeId: data.courseTypeId,
      assessmentModelId: data.assessmentModelId,
      isPKL: data.isPKL,
      isTA: data.isTA,
      predecessorId: data.predecessorId,
    };
    onSubmit(formData)
  }

  return (
    <form
      id="form-course-type"
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
                Nama Mata Kuliah
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Nama Mata Kuliah..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Kode Mata Kuliah
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Kode Mata Kuliah..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="credit"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                SKS Mata Kuliah
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="SKS Mata Kuliah..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name={"majorId"}
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
                  <SelectValue placeholder="Pilih Program Studi.." />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((item) => (
                    <SelectItem value={item.id.toString()} key={item.id}>{item.degree}-{item.name}</SelectItem>
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
          name={"courseTypeId"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Tipe Mata Kuliah
              </FieldLabel>
              <Select
                name={field.name}
                value={String(field.value)}
                onValueChange={field.onChange}
                required
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Pilih Tipe Mata Kuliah.." />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((item) => (
                    <SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>
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
          name={"assessmentModelId"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Model Penilaian
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
                  <SelectValue placeholder="Pilih Model Penilaian..." />
                </SelectTrigger>
                <SelectContent>
                  {assessment.map((item) => (
                    <SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>
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
          name={"predecessorId"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Mata Kuliah Pendahulu
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Pilih Mata Kuliah Pendahulu..." />
                </SelectTrigger>
                <SelectContent>
                  {assessment.map((item) => (
                    <SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>
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
          <Button size="sm" type="submit" form="form-major">
            Simpan
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default CourseForm;