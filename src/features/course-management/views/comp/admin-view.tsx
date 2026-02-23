"use client";

import ButtonCreate from "@/components/shared/button-create";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import AppDialog from "@/components/shared/app-dialog";
import { AssessmentComponent, Major } from "@/lib/types";
import { useAssessmentComponent } from "../../hooks/useAssessComponent";
import { assessmentComponentUI } from "../../policy";
import AssessmentComponentTable from "../../components/component-table/table";
import AssessmentComponentForm from "../../components/component-form/form";

const AdminAssessCompView = ({ role }: { role: string }) => {

  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Partial<AssessmentComponent> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { assessComp, createAssessmentComponent, updateAssessmentComponent, deleteAssessmentComponent } = useAssessmentComponent()

  const handleCreateNew = () => {
    setSelectedData(null);
    setOpenDialogForm(true);
    setIsEditMode(false);
  };

  const handleEdit = (data: Partial<AssessmentComponent>) => {
    setSelectedData(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string | number) => {
    const data = assessComp.find(p => p.id === id);
    if (data) {
      setSelectedData(data);
      setOpenDialogDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedData) {
      try {
        deleteAssessmentComponent("ADMIN", selectedData.id!);
        setOpenDialogDelete(false);
        setSelectedData(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = (data: Omit<AssessmentComponent, "id" | "created_at" | "updated_at" | "deleted_at">) => {
    try {
      if (selectedData && isEditMode) {
        updateAssessmentComponent("ADMIN", selectedData.id!, data);
      } else {
        createAssessmentComponent("ADMIN", data);
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
        <h1 className="block text-xl font-semibold self-start">Daftar Komponen Nilai</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role="ADMIN" feature={assessmentComponentUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <AssessmentComponentTable
        role="ADMIN"
        data={assessComp}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Komponen Nilai" : "Tambah Komponen Nilai"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <AssessmentComponentForm
          defaultValues={selectedData ?? undefined}
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
            Apakah Anda yakin ingin menghapus komponen nilai <strong>{selectedData?.name}</strong>?
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

export default AdminAssessCompView;