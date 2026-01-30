"use client";

import ButtonCreate from "@/components/shared/button-create";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { majorUI } from "../policy";
import { useState } from "react";
import MajorTable from "../components/major-table/table";
import { useMajors } from "../hooks/useMajors";
import AppDialog from "@/components/shared/app-dialog";
import MajorForm from "../components/major-form/form";
import { Major } from "@/lib/types";

const AdminMajorView = () => {

  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedMajor, setSelectedMajor] = useState<Partial<Major> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { majors, createMajor, updateMajor, deleteMajor } = useMajors()

  const handleCreateNew = () => {
    setSelectedMajor(null);
    setOpenDialogForm(true);
    setIsEditMode(false);
  };

  const handleEdit = (data: Partial<Major>) => {
    setSelectedMajor(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string) => {
    const major = majors.find(p => p.id === id);
    if (major) {
      setSelectedMajor(major);
      setOpenDialogDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedMajor) {
      try {
        deleteMajor("ADMIN", selectedMajor.id!);
        setOpenDialogDelete(false);
        setSelectedMajor(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = (data: Omit<Major, "id" | "created_at" | "updated_at" | "deleted_at">) => {
    try {
      if (selectedMajor && isEditMode) {
        updateMajor("ADMIN", selectedMajor.id!, data);
      } else {
        createMajor("ADMIN", data);
      }
      setOpenDialogForm(false);
      setSelectedMajor(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Submit failed:", error)
    }
  };

  const handleCancelForm = () => {
    setOpenDialogForm(false);
    setSelectedMajor(null);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-md flex-1 m-4 lg:mt-16 space-y-6">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between">
        <h1 className="block text-xl font-semibold self-start">Daftar Program Studi</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role="ADMIN" feature={majorUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <MajorTable
        role="ADMIN"
        data={majors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Program Studi" : "Tambah Program Studi"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <MajorForm
          defaultValues={selectedMajor ?? undefined}
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
        <div className="space-y-4 px-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus program studi <strong>{selectedMajor?.degree}-{selectedMajor?.name}</strong>?
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

export default AdminMajorView;