"use client";

import { Curriculum, LecturerWithUserAndMajor } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import ButtonCreate from "@/components/shared/button-create";
import AppDialog from "@/components/shared/app-dialog";
import { useCurriculums } from "../hooks/useCurriculum";
import { curriculumUI } from "../policy";
import CurriculumTable from "../components/curriculum-table/table";
import CurriculumForm from "../components/curriculum-form/form";

const AdminCurriculumView = ({ role }: { role: string }) => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Partial<Curriculum> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { curriculums, createCurriculum, updateCurriculum, deleteCurriculum } = useCurriculums();

  const handleCreateNew = () => {
    setSelectedData(null);
    setOpenDialogForm(true);
    setIsEditMode(false);
  };

  const handleEdit = (data: Partial<Curriculum>) => {
    setSelectedData(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string | number) => {
    const data = curriculums?.find(p => p.id === id);
    if (data) {
      setSelectedData(data);
      setOpenDialogDelete(true);
    }
  };

  // const handleConfirmDelete = () => {
  //   if (selectedLecturer) {
  //     try {
  //       deleteLecturer("ADMIN", selectedLecturer.id!);
  //       setOpenDialogDelete(false);
  //       setSelectedLecturer(null);
  //     } catch (error) {
  //       console.error("Delete failed:", error);
  //     }
  //   }
  // };

  const handleSubmit = (data: Omit<Curriculum, "id" | "created_at" | "updated_at" | "deleted_at">) => {
    try {
      if (selectedData && isEditMode) {
        updateCurriculum("ADMIN", selectedData.id!, data);
      } else {
        createCurriculum("ADMIN", data);
      }
      setOpenDialogForm(false);
      setSelectedData(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Submit failed:", error)
    }
  };

  const handleCancelForm = () => {
    setOpenDialogForm(false);
    setSelectedData(null);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-md flex-1 m-4 lg:mt-16 space-y-6">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between">
        <h1 className="block text-xl font-semibold self-start">Daftar Kurikulum</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role={role} feature={curriculumUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <CurriculumTable
        role="ADMIN"
        data={curriculums}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Kurikulum" : "Tambah Kurikulum"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <CurriculumForm
          defaultValues={selectedData ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
        />
      </AppDialog>

      {/* Delete Confirmation Dialog */}
      {/* <AppDialog
        title="Konfirmasi Hapus"
        open={openDialogDelete}
        onOpenChange={setOpenDialogDelete}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus Dosen <strong>{selectedLecturer?.name}</strong>?
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
      </AppDialog> */}
    </div>
  )
}

export default AdminCurriculumView;