import { dataAssessmentModel } from "@/lib/data-dummy";
import { AssessmentModelWithComponent } from "@/lib/types";
import { useState } from "react";

export const useAssessments = () => {
  const [assessment, setAssessment] = useState<AssessmentModelWithComponent[]>(dataAssessmentModel)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [assessment])

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

  function createAssessment(role: string, data: Omit<AssessmentModelWithComponent, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateAssessment(role: string, id: string, data: Partial<AssessmentModelWithComponent>) {
    return null;
  }

  function deleteAssessment(role: string, id: string) {
    return null
  }

  return { assessment, loading, error, createAssessment, updateAssessment, deleteAssessment };
}