import { lecturerFeatureMeta } from "./lecturer-management/policy";
import { majorFeatureMeta } from "./major-management/policy";
import { operatorFeatureMeta } from "./operator-management/policy";
import { periodFeatureMeta } from "./period-management/policy";
import { studentFeatureMeta } from "./student-management/policy";


export const featureRegistry = [
  periodFeatureMeta,
  majorFeatureMeta,
  operatorFeatureMeta,
  lecturerFeatureMeta,
  studentFeatureMeta,
];