"use client";

import { dataCurriculum } from "@/lib/data-dummy";
import { Curriculum, CurriculumDetailFormTypes, CurriculumWithCourse } from "@/lib/types";
import { useEffect, useState } from "react";

export const useCurriculums = () => {
  const [curriculums, setCurriculums] = useState<Curriculum[]>(dataCurriculum);
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

  function createCurriculum(role: string, data: Omit<Curriculum, "id" | "created_at" | "updated_at">) {
    return null;
  };

  function updateCurriculum(role: string, id: string | number, data: Partial<Curriculum>) {
    return null;
  };
  
  function deleteCurriculum(role: string, id: string | number) {
    return null;
  };

  return { curriculums, loading, error, createCurriculum, updateCurriculum, deleteCurriculum };
}

export const useCurriculum = (curriculumId: string | number) => {
  const [curriculum, setCurriculum] = useState<CurriculumWithCourse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (curriculumId) {
      loadData();
      // const data = dataCurriculum.find(p => p.id === curriculumId);
      // setCurriculum(data)
      
    }
  }, [curriculum])

  async function loadData() {
    if (!curriculumId) return;
    try {
      setLoading(true);
      setError(null);
      const data = dataCurriculum.find(p => p.id === curriculumId);
      setCurriculum(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "failed to load periods")
    } finally {
      setLoading(false);
    }
  };

  function createCurriculumDetail(role: string, data: CurriculumDetailFormTypes) {
    return null;
  };
  
  function deleteCurriculumDetail(role: string, id: string | number) {
    return null;
  };

  return { curriculum, loading, error, createCurriculumDetail, deleteCurriculumDetail };
}