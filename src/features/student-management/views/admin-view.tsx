"use client";

import { LecturerWithUserAndMajor, StudentWithUserAndMajor } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import ButtonCreate from "@/components/shared/button-create";
import { studentUI } from "../policy";
import LecturerTable from "../components/lecturer-table/table";
import AppDialog from "@/components/shared/app-dialog";
import LecturerForm from "../components/lecturer-form/form";
import { useStudents } from "../hooks/useStudents";
import StudentTable from "../components/lecturer-table/table";

const AdminStudentView = ({ role }: { role: string }) => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Partial<StudentWithUserAndMajor> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { students, createStudent, updateStudent, deleteStudent } = useStudents();

  const handleCreateNew = () => {
    setSelectedStudent(null);
    setOpenDialogForm(true);
    setIsEditMode(false);
  };

  const handleEdit = (data: Partial<StudentWithUserAndMajor>) => {
    setSelectedStudent(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string) => {
    const major = students?.find(p => p.id === id);
    if (major) {
      setSelectedStudent(major);
      setOpenDialogDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedStudent) {
      try {
        deleteStudent("ADMIN", selectedStudent.id!);
        setOpenDialogDelete(false);
        setSelectedStudent(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = (data: Omit<StudentWithUserAndMajor, "id" | "created_at" | "updated_at" | "deleted_at">) => {
    try {
      if (selectedStudent && isEditMode) {
        updateStudent("ADMIN", selectedStudent.id!, data);
      } else {
        createStudent("ADMIN", data);
      }
      setOpenDialogForm(false);
      setSelectedStudent(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Submit failed:", error)
    }
  };

  const handleCancelForm = () => {
    setOpenDialogForm(false);
    setSelectedStudent(null);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-md flex-1 m-4 lg:mt-16 space-y-6">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between">
        <h1 className="block text-xl font-semibold self-start">Daftar Mahasiswa</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role={role} feature={studentUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <StudentTable
        role="ADMIN"
        data={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Program Studi" : "Tambah Program Studi"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <LecturerForm
          defaultValues={selectedStudent ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
        />
      </AppDialog>

      {/* Delete Confirmation Dialog */}
      <AppDialog
        title="Konfirmasi Hapus"
        open={openDialogDelete}
        onOpenChange={setOpenDialogDelete}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus Mahasiswa <strong>{selectedStudent?.name}</strong>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenDialogDelete(false)}
            >
              Batal
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Hapus
            </Button>
          </div>
        </div>
      </AppDialog>
    </div>
  )
}

export default AdminStudentView;