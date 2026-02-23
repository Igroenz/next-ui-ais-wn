import { dataCourseType } from "@/lib/data-dummy";
import { Course, CourseType } from "@/lib/types";
import { useState } from "react";

export const useCoursesType = () => {
  const [courseTypes, setCourseType] = useState<CourseType[]>(dataCourseType)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   loadData();
  // }, [courses])

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

  function createCourseType(role: string, data: Omit<CourseType, "id" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateCourseType(role: string, id: string | number, data: Partial<CourseType>) {
    return null;
  }

  function deleteCourseType(role: string, id: string | number) {
    return null
  }

  return {courseTypes, loading, error, createCourseType, updateCourseType, deleteCourseType}
}