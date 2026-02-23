import { BookOpenText, ChevronRight } from "lucide-react";
import { assessmentComponentPermission, assessmentModelPermission, coursePermission, courseTypePermission } from "./security";
import { featureMeta } from "@/lib/types";

export const courseFeatureMeta: featureMeta = {
  key: 'courses',
  order: 6,
  route: '/courses',
  icon: BookOpenText,
  label: {
    ADMIN: "Mata Kuliah",
  },
  permission: coursePermission,
  nested: [
    {
      key: 'course-menu',
      order: 1,
      route: '/courses/main',
      icon: ChevronRight,
      label: {
        ADMIN: "Data Mata Kuliah",
      },
      permission: coursePermission,
    },
    {
      key: 'course-type-menu',
      order: 1,
      route: '/courses/type',
      icon: ChevronRight,
      label: {
        ADMIN: "Tipe Mata Kuliah",
      },
      permission: courseTypePermission,
    },
    {
      key: 'assessment-menu',
      order: 1,
      route: '/courses/assessment',
      icon: ChevronRight,
      label: {
        ADMIN: "Model Penilaian",
      },
      permission: assessmentModelPermission,
    },
    {
      key: 'assess-comp-menu',
      order: 1,
      route: '/courses/component',
      icon: ChevronRight,
      label: {
        ADMIN: "Komponen Penilaian",
      },
      permission: assessmentComponentPermission,
    },
  ]
};