import diagnosesData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  addDiagnoses,
  getDiagnoses,
};
