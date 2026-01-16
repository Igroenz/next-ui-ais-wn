"use client";

import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import PeriodTable from "../components/period-table/table";
import { usePeriods } from "../hooks/usePeriods";
import ButtonCreate from "@/components/shared/button-create";

const AdminPeriodView = () => {
  const { periods } = usePeriods();

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
            <ButtonCreate />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <PeriodTable role="ADMIN" data={periods} />

    </div>
  )
}

export default AdminPeriodView;