"use client";

import { useEffect, useState } from "react";
import { AcademicPeriod } from "../types";
import { dataPeriod } from "@/lib/data-dummy";
import { canAccessPeriodResource } from "../policy";

export const usePeriods = () => {
  const [periods, setPeriods] = useState<AcademicPeriod[]>(dataPeriod);
  const [loading, setLoading] = useState<boolean>(true);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "gagal menambahkan periode akademik");
    }
  }
  

  return { periods, loading, error, createPeriod };
}