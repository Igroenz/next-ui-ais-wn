"use client";

import ButtonCreate from "@/components/shared/button-create";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import AppDialog from "@/components/shared/app-dialog";
import { Course, CourseType } from "@/lib/types";
import { courseTypeUI, courseUI } from "../../policy";
import { useCoursesType } from "../../hooks/useCourseType";
import CourseTypeTable from "../../components/type-table/table";
import CourseTypeForm from "../../components/type-form/form";
import { useCourses } from "../../hooks/useCourses";
import CourseTable from "../../components/course-table/table";
import CourseForm from "../../components/course-form/form";

const AdminCourseView = ({ role }: { role: string }) => {

  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Partial<Course> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { courses, createCourse, updateCourse, deleteCourse } = useCourses();
  const handleCreateNew = () => {
    setSelectedData(null);
    setOpenDialogForm(true);
    setIsEditMode(false);
  };

  const handleEdit = (data: Partial<Course>) => {
    setSelectedData(data);
    setIsEditMode(true);
    setOpenDialogForm(true);
  };

  const handleDelete = (id: string | number) => {
    const data = courses.find(p => p.id === id);
    if (data) {
      setSelectedData(data);
      setOpenDialogDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedData) {
      try {
        deleteCourse("ADMIN", selectedData.id!);
        setOpenDialogDelete(false);
        setSelectedData(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleSubmit = (data: Omit<Course, "id" | "validFrom" | "validTo" | "created_at" | "updated_at" | "deleted_at">) => {
    try {
      if (selectedData && isEditMode) {
        updateCourse("ADMIN", selectedData.id!, data);
      } else {
        createCourse("ADMIN", data);
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
        <h1 className="block text-xl font-semibold self-start">Daftar Mata Kuliah</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Button variant="secondary" size="sm" className="h-9 w-9 rounded-full">
              <Filter />
            </Button>
            <ButtonCreate role="ADMIN" feature={courseUI} onCreate={handleCreateNew} />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <CourseTable
        role="ADMIN"
        data={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <AppDialog
        title={isEditMode ? "Edit Tipe Mata Kuliah" : "Tambah Tipe Mata Kuliah"}
        open={openDialogForm}
        onOpenChange={setOpenDialogForm}
      >
        <CourseForm
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
        <div className="space-y-4 px-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus tipe mata kuliah <strong>{selectedData?.name}</strong>?
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

export default AdminCourseView;