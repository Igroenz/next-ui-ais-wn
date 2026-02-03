"use client";

import { useState } from "react"
import { dataOperator } from "@/lib/data-dummy";
import { Operator } from "@/lib/types";

export const useOperators = () => {
  const [operators, setOperators] = useState<Operator[]>(dataOperator)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [operators])

  // async function loadData() {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const data = dataOperator;
  //     setOperators(data);
  //   } catch (error) {
  //     setError(error instanceof Error ? error.message : "failed to load periods")
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function createOperator(role: string, data: Omit<Operator, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateOperator(role: string, id: string, data: Partial<Operator>) {
    return null;
  }

  function deleteOperator(role: string, id: string) {
    return null
  }

  return {operators, loading, error, createOperator, updateOperator, deleteOperator}
}