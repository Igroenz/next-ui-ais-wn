import { DEGREE, GENDER, LecturerWithUserAndMajor, ROLES } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { lecturerFormSchema, LecturerFormValues } from "../../schema";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { degree, gender, roles } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useMajors } from "@/features/major-management/hooks/useMajors";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LecturerFormProps {
  onSubmit: (data: Omit<LecturerWithUserAndMajor, "id" | "created_at" | "updated_at" | "deleted_at">) => void;
  onCancel: () => void;
  defaultValues?: Partial<LecturerWithUserAndMajor>;
};

const LecturerForm = ({
  onSubmit, onCancel, defaultValues
}: LecturerFormProps) => {

  const { majors } = useMajors();

  const form = useForm<LecturerFormValues>({
    resolver: zodResolver(lecturerFormSchema),
    defaultValues: {
      id: "",
      name: "",
      employee_id: "",
      entryYear: "",
      degree: "",
      gender: "PRIA",
      personal_email: "",
      personal_phone: "",
      avatar: "",
      majorId: "",
      email: "",
      password: "",
      role: "LECTURER",
    }
  })

  function onSubmitForm(data: LecturerFormValues) {
    const formData = {
      name: data.name,
      employee_id: data.employee_id,
      entryYear: data.entryYear,
      degree: data.degree as DEGREE,
      gender: data.gender as GENDER,
      personal_email: data.personal_email,
      personal_phone: data.personal_phone,
      avatar: data.avatar,
      majorId: data.majorId,
      email: data.email,
      password: data.password,
      role: data.role as ROLES,
    };
    onSubmit(formData)
  }

  return (
    <form
      id="form-operators"
      onSubmit={form.handleSubmit(onSubmitForm)}
      className="space-y-6"
    >
      <FieldSet>
        <FieldLegend className="text-muted-foreground text-sm">Data User Login</FieldLegend>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Username/email
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Username/email..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Password..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Tipe User
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
                    <SelectValue placeholder="Pilih Tipe User" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem value={role} key={role}>{role}</SelectItem>
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
      </FieldSet>
      <FieldSeparator />
      <FieldSet className="mt-4">
        <FieldLegend className="text-muted-foreground text-sm">Data Personal</FieldLegend>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1 gap-y-4 md:gap-y-6">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Nama Lengkap
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Nama Dosen..."
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="employee_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  No.Induk Pegawai
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="No.Induk Pegawai..."
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldLegend variant="label">Gender</FieldLegend>
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                >
                  {gender.map((item) => (
                    <Field key={item} orientation="horizontal">
                      <RadioGroupItem value={item} id={item} />
                      <FieldLabel htmlFor={item}>
                        {item}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
            )}
          />
          <Controller
            name="entryYear"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Tahun Masuk
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Tahun Masuk..."
                  inputMode="numeric"
                  onInput={(e: FormEvent<HTMLInputElement>) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '')}
                  required
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
                  Pendidikan Terakhir
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
                    <SelectValue placeholder="Pilih Pendidikan Terakhir..." />
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
            name="personal_email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Personal Email
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="personal@email.com..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="personal_phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Personal No. Handphone
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  inputMode="numeric"
                  onInput={(e: FormEvent<HTMLInputElement>) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '')}
                  placeholder="08115421..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="avatar"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Avatar
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="file"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <FieldGroup>
        <Field orientation="horizontal">
          <Button size="sm" type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button size="sm" type="submit" form="form-operators">
            Simpan
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LecturerForm;