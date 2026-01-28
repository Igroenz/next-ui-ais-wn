"use client";

import { useState } from "react"
import { Major } from "../types"
import { dataMajor } from "@/lib/data-dummy";

export const useMajors = () => {
  const [majors, setMajors] = useState<Major[]>(dataMajor)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [majors])

  // async function loadData() {
  //   try {
  //     setLoading(true);
  //     setError(null);
      // const data = dataMajor;
  //     setPeriods(data);
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : "failed to load periods")
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function createMajor(role: string, data: Omit<Major, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateMajor(role: string, id: string, data: Partial<Major>) {
    return null;
  }

  function deleteMajor(role: string, id: string) {
    return null
  }

  return {majors, loading, error, createMajor, updateMajor, deleteMajor}
}