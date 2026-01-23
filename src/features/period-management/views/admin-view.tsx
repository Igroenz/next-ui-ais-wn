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

const AdminPeriodView = () => {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const { periods, createPeriod } = usePeriods();

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
            <ButtonCreate role="ADMIN" feature={periodUI} onCreate={() => setOpenDialogForm(true)} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <PeriodTable role="ADMIN" data={periods} />

      {/* Form Create */}
      <AppDialog
        title={"Tambah Periode Akademik"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}

      >
        <PeriodForm
          onSubmit={(data) => {
            createPeriod("ADMIN", data)
            setOpenDialogForm(false)
          }}
          onCancel={() => setOpenDialogForm(false)}
        />
      </AppDialog>
    </div>
  )
}

export default AdminPeriodView;