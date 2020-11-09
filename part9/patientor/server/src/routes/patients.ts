import express from "express";
import { toNewEntry, toNewPatientEntry } from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);
  console.log("New patient endpoint");
  console.log();

  if (patient) {
    try {
      const entry = toNewEntry(req.body);
      const newEntry = patientService.createEntry(patient, entry);
      res.json(newEntry);
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
  } else {
    res.status(404).send(`Patient ${req.params.id} does not exist.`);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.createPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
