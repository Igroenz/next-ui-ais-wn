import { dataComponent } from "@/lib/data-dummy";
import { AssessmentComponent } from "@/lib/types";
import { useState } from "react";

export const useAssessmentComponent = () => {
  const [assessComp, setAssessComp] = useState<AssessmentComponent[]>(dataComponent)
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

  // AssessmentComponent
  function createAssessmentComponent(role: string, data: Omit<AssessmentComponent, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateAssessmentComponent(role: string, id: string | number, data: Partial<AssessmentComponent>) {
    return null;
  }

  function deleteAssessmentComponent(role: string, id: string | number) {
    return null
  }

  return {assessComp, loading, error, createAssessmentComponent, updateAssessmentComponent, deleteAssessmentComponent}
};