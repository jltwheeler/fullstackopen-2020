import { v4 as uuidv4 } from "uuid";
import patientData from "../../data/patients.json";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData as Patient[];

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((item) => item.id === id);
  return entry;
};

const createId = (): string => {
  return String(uuidv4());
};

const createPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: createId(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  createPatient,
  getPatients,
  findById,
};
