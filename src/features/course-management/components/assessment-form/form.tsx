import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { degree } from "@/lib/settings";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssessmentModelWithComponent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { assessmentModelFormSchema, AssessmentModelFormValues } from "../../schema";
import { useAssessmentComponent } from "../../hooks/useAssessComponent";
import { FormEvent } from "react";

interface AssessmentModelFormProps {
  onSubmit: (data: Omit<AssessmentModelWithComponent, "id" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<AssessmentModelWithComponent>;
};

const AssessmentModelForm = ({
  onSubmit, onCancel, defaultValues
}: AssessmentModelFormProps) => {
  const form = useForm<AssessmentModelFormValues>({
    resolver: zodResolver(assessmentModelFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      assessmentModelComponent: defaultValues?.assessmentModelComponent || [{ assessmentComponentId: '', percentage: 0, sort_order: 1 }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "assessmentModelComponent"
  })

  const { assessComp } = useAssessmentComponent();

  function onSubmitForm(data: AssessmentModelFormValues) {
    const formData = {
      name: data.name,
      description: data.description,
    };
    onSubmit(formData)
  }

  return (
    <form
      id="form-assessment-model"
      onSubmit={form.handleSubmit(onSubmitForm)}
      className="space-y-6"
    >
      <FieldSet>
        <FieldLegend className="text-muted-foreground text-sm">Data Model Penilaian</FieldLegend>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] p-1">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Model Penilaian
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Nama Model Penilaian..."
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
                  Deskripsi Model Penilaian
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Deskripsi Model Penilaian..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet className="mt-4">
        <FieldLegend className="text-muted-foreground text-sm">Data Komponen Nilai</FieldLegend>
        <FieldGroup className="flex flex-cols mt-2 gap-4">
          {fields.map((item, index) => (
            <FieldSet key={index}>
              <FieldLegend variant="label" className="text-muted-foreground text-sm">Komponen nilai {index + 1}</FieldLegend>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr] gap-2 items-end">
                <Controller
                  name={`assessmentModelComponent.${index}.sort_order`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={controllerField.name}>
                        Urutan
                      </FieldLabel>
                      <Input
                        {...controllerField}
                        id={controllerField.name}
                        aria-invalid={fieldState.invalid}
                        inputMode="numeric"
                        onInput={(e: FormEvent<HTMLInputElement>) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '')}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`assessmentModelComponent.${index}.assessmentComponentId`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={controllerField.name}>
                        Komponen nilai
                      </FieldLabel>
                      <Select
                        name={controllerField.name}
                        value={String(controllerField.value)}
                        onValueChange={controllerField.onChange}
                        required
                      >
                        <SelectTrigger
                          id={controllerField.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Pilih Komponen Nilai" />
                        </SelectTrigger>
                        <SelectContent>
                          {assessComp.map((item) => (
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
                  name={`assessmentModelComponent.${index}.percentage`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={controllerField.name}>
                        Persentase
                      </FieldLabel>
                      <Input
                        {...controllerField}
                        id={controllerField.name}
                        aria-invalid={fieldState.invalid}
                        inputMode="numeric"
                        onInput={(e: FormEvent<HTMLInputElement>) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '')}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {index > 0 && (
                  <Button type="button" variant={"destructive"} size={"sm"} onClick={() => remove(index)}>
                    Hapus
                  </Button>
                )}
              </FieldGroup>

            </FieldSet>
          ))}
        </FieldGroup>
      </FieldSet>
      <Button
        className="flex-none text-sm"
        size={"sm"}
        variant={"outline"}
        onClick={() => append({ assessmentComponentId: '', percentage: 0, sort_order: 1 })}
        type="button"
      >
        Tambah Komponen
      </Button>
      <FieldGroup className="mt-8">
        <Field orientation="horizontal">
          <Button size="sm" type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button size="sm" type="submit" form="form-assessment-model">
            Simpan
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default AssessmentModelForm;