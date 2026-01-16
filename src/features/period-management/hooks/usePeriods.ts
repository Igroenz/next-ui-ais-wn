"use client";

import { useEffect, useState } from "react";
import { AcademicPeriod } from "../types";
import { dataPeriod } from "@/lib/data-dummy";

export const usePeriods = () => {
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [periods])

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const data = dataPeriod;
      setPeriods(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "failed to load periods")
    } finally {
      setLoading(false);
    }
  };

  return { periods, loading, error };
}