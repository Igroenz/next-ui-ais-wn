"use client";

import { useState } from "react"
import { LecturerWithUserAndMajor } from "@/lib/types";
import { dataLecturer } from "@/lib/data-dummy";

export const useLecturers = () => {
  const [lecturers, setLecturers] = useState<LecturerWithUserAndMajor[] | []>(dataLecturer)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [lecturers])

  // async function loadData() {
  //   try {
  //     setLoading(true);
  //     setError(null);
      // const data = dataMajor;
  //     setLecturers(data);
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : "failed to load periods")
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function createLecturer(role: string, data: Omit<LecturerWithUserAndMajor, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateLecturer(role: string, id: string, data: Partial<LecturerWithUserAndMajor>) {
    return null;
  }

  function deleteLecturer(role: string, id: string) {
    return null
  }

  return {lecturers, loading, error, createLecturer, updateLecturer, deleteLecturer}
}