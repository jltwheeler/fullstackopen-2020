/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  EntryTypes,
  NewEntry,
  Diagnose,
  HealthCheckRating,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occuptation: ${occupation}`);
  }
  return occupation;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect ot missing gender: ${gender}`);
  }
  return gender;
};

const isEntryType = (type: any): type is EntryTypes => {
  return Object.values(EntryTypes).includes(type);
};

const parseEntryType = (type: any): EntryTypes => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing entry type: ${type}`);
  }

  return type;
};

const parseDescription = (desc: any): string => {
  if (!desc || !isString(desc)) {
    throw new Error(`Incorrect or missing description: ${desc}`);
  }
  return desc;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing description: ${specialist}`);
  }
  return specialist;
};

const parseCode = (code: any): string => {
  if (!code || !isString(code)) {
    throw new Error(`Incorrect or missing description: ${code}`);
  }
  return code;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Diagnose["code"][] => {
  if (!diagnosisCodes) return diagnosisCodes;

  if (!Array.isArray(diagnosisCodes))
    throw new Error("Incorrect diagnoses codes");

  if (!diagnosisCodes.every((code) => parseCode(code))) {
    throw new Error("Incorrect diagnoses codes");
  }

  return diagnosisCodes;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect health check rating");
  }

  return rating;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if (!discharge || !Object.keys(discharge).every((key) => isString(key))) {
    throw new Error("Incorrect discharge");
  }
  return discharge;
};

const parseSickleave = (
  sickLeave: any
): { startDate: string; endDate: string } => {
  if (!sickLeave) return sickLeave;
  if (!Object.keys(sickLeave).every((key) => isString(key))) {
    throw new Error("Incorrect sick leave");
  }
  return sickLeave;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employer name: ${name}`);
  }
  return name;
};

export const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };

  return newEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const entryType = parseEntryType(object.type);

  const baseEntry: Omit<NewEntry, "type"> = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  console.log();
  console.log(baseEntry);

  switch (entryType) {
    case "HealthCheck":
      return {
        ...baseEntry,
        type: EntryTypes.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "Hospital":
      return {
        ...baseEntry,
        type: EntryTypes.Hospital,
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: EntryTypes.OccupationalHealth,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickleave(object.sickLeave),
      };
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(object)}`
      );
  }
};
