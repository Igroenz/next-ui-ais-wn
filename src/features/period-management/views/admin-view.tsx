"use client";

import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import PeriodTable from "../components/period-table/table";
import { usePeriods } from "../hooks/usePeriods";
import ButtonCreate from "@/components/shared/button-create";
import { periodUI } from "../policy";
import { useState } from "react";
import AppDialog from "@/components/shared/app-dialog";
import PeriodForm from "../components/period-form/form";
import { AcademicPeriod } from "../types";

const AdminPeriodView = () => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<Partial<AcademicPeriod> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { periods, createPeriod, updatePeriod, deletePeriod } = usePeriods();

  const handleEdit = (data: Partial<AcademicPeriod>) => {
    console.log(data);

    setSelectedPeriod(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string) => {
    const period = periods.find(p => p.id === id);
    if (period) {
      setSelectedPeriod(period);
      setOpenDialogDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPeriod) {
      try {
        deletePeriod("ADMIN", selectedPeriod.id!);
        setOpenDialogDelete(false);
        setSelectedPeriod(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = (data: Omit<AcademicPeriod, "id" | "created_at" | "updated_at">) => {
    try {
      if (selectedPeriod && isEditMode) {
        updatePeriod("ADMIN", selectedPeriod.id!, data);
      } else {
        createPeriod("ADMIN", data);
      }
      setOpenDialogForm(false);
      setSelectedPeriod(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleCreateNew = () => {
    setSelectedPeriod(null);
    setIsEditMode(false);
    setOpenDialogForm(true);
  };

  const handleCancelForm = () => {
    setOpenDialogForm(false);
    setSelectedPeriod(null);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-md flex-1 m-4 lg:mt-16 space-y-6">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between">
        <h1 className="block text-xl font-semibold self-start">Daftar Periode Akademik</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role="ADMIN" feature={periodUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <PeriodTable
        role="ADMIN"
        data={periods}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Periode Akademik" : "Tambah Periode Akademik"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <PeriodForm
          defaultValues={selectedPeriod ?? undefined}
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
            Apakah Anda yakin ingin menghapus periode akademik <strong>{selectedPeriod?.semester_type} {selectedPeriod?.year}/{selectedPeriod?.year ? selectedPeriod.year + 1 : ''}</strong>?
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

export default AdminPeriodView;