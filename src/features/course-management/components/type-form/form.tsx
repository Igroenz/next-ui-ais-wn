import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CourseType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { courseTypeFormSchema, CourseTypeFormValues } from "../../schema";

interface CourseTypeFormProps {
  onSubmit: (data: Omit<CourseType, "id" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<CourseType>;
};

const CourseTypeForm = ({
  onSubmit, onCancel, defaultValues
}: CourseTypeFormProps) => {
  const form = useForm<CourseTypeFormValues>({
    resolver: zodResolver(courseTypeFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    }
  })

  function onSubmitForm(data: CourseTypeFormValues) {
    const formData = {
      name: data.name,
      description: data.description,
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
                Tipe Mata Kuliah
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Tipe Mata Kuliah..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Deskripsi
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Deskripsi..."
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

export default CourseTypeForm;