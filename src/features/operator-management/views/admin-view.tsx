"use client";

import ButtonCreate from "@/components/shared/button-create";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { operatorUI } from "../policy";
import { useState } from "react";
import AppDialog from "@/components/shared/app-dialog";
// import MajorForm from "../components/major-form/form";
import { Operator } from "@/lib/types";
import OperatorTable from "../components/operator-table/table";
import { useOperators } from "../hooks/useOperators";
import OperatorForm from "../components/operator-form/form";

const AdminOperatorView = () => {

  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<Partial<Operator> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { operators, createOperator, updateOperator, deleteOperator } = useOperators()

  const handleCreateNew = () => {
    setSelectedOperator(null);
    setOpenDialogForm(true);
    setIsEditMode(false);
  };

  const handleEdit = (data: Partial<Operator>) => {
    setSelectedOperator(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string) => {
    const major = operators.find(p => p.id === id);
    if (major) {
      setSelectedOperator(major);
      setOpenDialogDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedOperator) {
      try {
        deleteOperator("ADMIN", selectedOperator.id!);
        setOpenDialogDelete(false);
        setSelectedOperator(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = (data: Omit<Operator, "id" | "created_at" | "updated_at" | "deleted_at">) => {
    try {
      if (selectedOperator && isEditMode) {
        updateOperator("ADMIN", selectedOperator.id!, data);
      } else {
        createOperator("ADMIN", data);
      }
      setOpenDialogForm(false);
      setSelectedOperator(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("Submit failed:", error)
    }
  };

  const handleCancelForm = () => {
    setOpenDialogForm(false);
    setSelectedOperator(null);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-md flex-1 m-4 lg:mt-16 space-y-6">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between">
        <h1 className="block text-xl font-semibold self-start">Daftar Operator</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role="ADMIN" feature={operatorUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <OperatorTable
        role="ADMIN"
        data={operators}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Operator" : "Tambah Operator"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <OperatorForm
          defaultValues={selectedOperator ?? undefined}
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
            Apakah Anda yakin ingin menghapus operator <strong>{selectedOperator?.name}</strong>?
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

export default AdminOperatorView;