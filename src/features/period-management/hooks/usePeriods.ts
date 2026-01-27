"use client";

import { useEffect, useState } from "react";
import { AcademicPeriod } from "../types";
import { dataPeriod } from "@/lib/data-dummy";
import { canAccessPeriodResource } from "../policy";
// import { periodService } from "../services";

export const usePeriods = () => {
  const [periods, setPeriods] = useState<AcademicPeriod[]>(dataPeriod);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [periods])

  // async function loadData() {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const data = dataPeriod;
  //     setPeriods(data);
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : "failed to load periods")
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function createPeriod(role: string, data: Omit<AcademicPeriod, "id" | "created_at" | "updated_at">) {
    try {
      const checkPermission = canAccessPeriodResource(role, "create")
      if (!checkPermission) {
        throw new Error("User not authorized")
      };

      const dataCreate = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date(),
        updated_at: new Date(),
      }

      setPeriods((prev) => [...prev, dataCreate]);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "gagal menambahkan periode akademik";
      setError(errorMessage);
      throw err;
    }
  };

  function updatePeriod(role: string, id: string, data: Partial<Omit<AcademicPeriod, "id" | "created_at" | "updated_at">>) {
    try {
      const checkPermission = canAccessPeriodResource(role, "edit")
      if (!checkPermission) {
        throw new Error("User not authorized to update period")
      };

      setPeriods((prev) =>
        prev.map((period) => 
          period.id === id 
            ? { 
                ...period, 
                ...data, 
                updated_at: new Date() 
              } 
            : period
        )
      );
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "gagal mengubah periode akademik";
      setError(errorMessage);
      throw err;
    }
  };
  
  function deletePeriod(role: string, id: string) {
    try {
      const checkPermission = canAccessPeriodResource(role, "delete")
      if (!checkPermission) {
        throw new Error("User not authorized to delete period")
      };

      setPeriods((prev) =>
        prev.filter((period) => period.id !== id)
      );
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "gagal menghapus periode akademik";
      setError(errorMessage);
      throw err;
    }
  };

  return { periods, loading, error, createPeriod, updatePeriod, deletePeriod };
}