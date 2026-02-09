"use client";

import { useState } from "react"
import { LecturerWithUserAndMajor, StudentWithUserAndMajor } from "@/lib/types";
import { dataLecturer, dataStudent } from "@/lib/data-dummy";

export const useStudents = () => {
  const [students, setStudents] = useState<StudentWithUserAndMajor[]>(dataStudent)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [students])

  // async function loadData() {
  //   try {
  //     setLoading(true);
  //     setError(null);
      // const data = dataMajor;
  //     setStudents(data);
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : "failed to load periods")
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function createStudent(role: string, data: Omit<StudentWithUserAndMajor, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateStudent(role: string, id: string, data: Partial<StudentWithUserAndMajor>) {
    return null;
  }

  function deleteStudent(role: string, id: string) {
    return null
  }

  return {students, loading, error, createStudent, updateStudent, deleteStudent}
}