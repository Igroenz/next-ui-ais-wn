import { Controller, useForm } from "react-hook-form";
import { majorFormSchema, MajorFormValues } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { degree } from "@/lib/settings";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEGREE, Major } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface MajorFormProps {
  onSubmit: (data: Omit<Major, "id" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<Major>;
};

const MajorForm = ({
  onSubmit, onCancel, defaultValues
}: MajorFormProps) => {
  const form = useForm<MajorFormValues>({
    resolver: zodResolver(majorFormSchema),
    defaultValues: {
      id: defaultValues?.id ?? "",
      name: defaultValues?.name ?? "",
      code: defaultValues?.code ?? "",
      degree: defaultValues?.degree ?? "S1",
    }
  })

  function onSubmitForm(data: MajorFormValues) {
    const formData = {
      name: data.name,
      code: data.code,
      degree: data.degree as DEGREE,
    };
    onSubmit(formData)
  }

  return (
    <form
      id="form-major"
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
                Nama Program Studi
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Nama Program Studi..."
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
                Kode Program Studi
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Kode Program Studi..."
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="degree"
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
                  {degree.map((degree) => (
                    <SelectItem value={degree} key={degree}>{degree}</SelectItem>
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

export default MajorForm;