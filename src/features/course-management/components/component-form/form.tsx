import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { degree } from "@/lib/settings";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssessmentComponent, DEGREE, Major } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { assessmentComponentFormSchema, AssessmentComponentFormValues } from "../../schema";

interface AssessmentComponentFormProps {
  onSubmit: (data: Omit<AssessmentComponent, "id" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<AssessmentComponent>;
};

const AssessmentComponentForm = ({
  onSubmit, onCancel, defaultValues
}: AssessmentComponentFormProps) => {
  const form = useForm<AssessmentComponentFormValues>({
    resolver: zodResolver(assessmentComponentFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      acronym: defaultValues?.acronym ?? "",
      description: defaultValues?.description ?? "",
    }
  })

  function onSubmitForm(data: AssessmentComponentFormValues) {
    const formData = {
      name: data.name,
      acronym: data.acronym,
      description: data.description,
    };
    onSubmit(formData)
  }

  return (
    <form
      id="form-assessment-component"
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
                Komponen Nilai
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Nama Komponen Nilai..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="acronym"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Akronim Komponen Nilai
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Akronim Komponen Nilai..."
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
                Deskripsi Komponen Nilai
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Deskripsi Komponen Nilai..."
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

export default AssessmentComponentForm;