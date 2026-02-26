import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Curriculum, CurriculumDetail, CurriculumDetailFormTypes, CurriculumWithCourse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { curriculumDetailFormSchema, CurriculumDetailFormValues, curriculumFormSchema, CurriculumFormValues } from "../../schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMajors } from "@/features/major-management/hooks/useMajors";
import { usePeriods } from "@/features/period-management/hooks/usePeriods";
import { useCourses } from "@/features/course-management/hooks/useCourses";
import { Checkbox } from "@/components/ui/checkbox";

interface CurriculumDetailFormProps {
  onSubmit: (data: CurriculumDetailFormTypes) => void;
  onCancel: () => void;
  defaultValues?: Partial<CurriculumWithCourse>;
};

const CurriculumDetailForm = ({
  onSubmit, onCancel, defaultValues
}: CurriculumDetailFormProps) => {
  const form = useForm<CurriculumDetailFormValues>({
    resolver: zodResolver(curriculumDetailFormSchema),
    defaultValues: {
      curriculumId: defaultValues?.id,
      courses: [],
    }
  })

  function onSubmitForm(data: CurriculumDetailFormValues) {
    const formData = {
      curriculumId: data?.curriculumId,
      semester: data?.semester,
      courses: data.courses,

    };
    onSubmit(formData)
  }

  const semester = [1, 2, 3, 4, 5, 6, 7, 8];
  const { courses } = useCourses();

  return (
    <form
      id="form-assessment-model"
      onSubmit={form.handleSubmit(onSubmitForm)}
      className="space-y-6"
    >
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1">
        <Controller
          name="curriculumId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="hidden" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Kurikulum ID
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                value={field.value}
                aria-invalid={fieldState.invalid}
                placeholder="Nama Kurikulum..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Field>
          <FieldLabel>
            Kurikulum
          </FieldLabel>
          <Input
            value={defaultValues?.name}
            readOnly
            placeholder="Nama Kurikulum..."
          />
        </Field>
        <Controller
          name="semester"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Semester
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
                  <SelectValue placeholder="Pilih Semester..." />
                </SelectTrigger>
                <SelectContent>
                  {semester.map((smt) => (
                    <SelectItem value={String(smt)} key={smt}>{smt}</SelectItem>
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

      <FieldSet>
        <FieldLegend>Daftar Mata Kuliah</FieldLegend>
        <Controller
          name="courses"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldGroup data-slot="checkbox-group">
              {courses.map((course) => (
                <Field
                  key={course.id}
                  orientation={"horizontal"}
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id={course.id}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    checked={field.value.includes(course.id)}
                    onCheckedChange={(checked) => {
                      const newValue = checked ? [...field.value, course.id] : field.value.filter((value) => value !== course.id)
                      field.onChange(newValue)
                    }}
                  />
                  <FieldLabel
                    htmlFor={course.id}
                    className="text-xs sm:text-sm text-gray-950"
                  >
                    {course.code} {course.name}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          )}
        />
      </FieldSet>


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

export default CurriculumDetailForm;