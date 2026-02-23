import { dataCourse } from "@/lib/data-dummy";
import { Course, CourseType } from "@/lib/types";
import { useState } from "react";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(dataCourse)
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

  function createCourse(role: string, data: Omit<Course, "id" | "validFrom" | "validTo" | "created_at" | "updated_at" | "deleted_at">) {
    return null;
  }

  function updateCourse(role: string, id: string | number, data: Partial<Course>) {
    return null;
  }

  function deleteCourse(role: string, id: string | number) {
    return null
  }


  return {courses, loading, error, createCourse, updateCourse, deleteCourse}
}