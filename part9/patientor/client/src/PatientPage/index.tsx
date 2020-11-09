import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

import { EntryFormValues } from "./AddEntryForm";
import { apiBaseUrl } from "../constants";
import { EntryTypes, Patient } from "../types";
import { useStateValue, setPatient, addEntry } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<EntryTypes>(
    EntryTypes.HealthCheck
  );
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (type: EntryTypes): void => {
    setEntryType(type);
    setModalOpen(true);
  };
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    const fetchPatienDetails = async () => {
      try {
        const response: AxiosResponse<Patient> = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(response.data));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      fetchPatienDetails();
    }
  }, [dispatch, patient, id]);

  const renderIcon = () => {
    switch (patient?.gender) {
      case "male":
        return <Icon name="mars" />;
      case "female":
        return <Icon name="venus" />;
      case "other":
        return <Icon name="other gender" />;
      default:
        return null;
    }
  };

  if (patient) {
    return (
      <div>
        <h1>
          {patient.name} {renderIcon()}
        </h1>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <br />
        <div>
          <h3>Entries</h3>
          {patient.entries?.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          entryType={entryType}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <br />
        <Button onClick={() => openModal(EntryTypes.Hospital)}>
          Add New Hospital Entry
        </Button>
        <Button onClick={() => openModal(EntryTypes.OccupationalHealth)}>
          Add New Occupational Healthcare Entry
        </Button>
        <Button onClick={() => openModal(EntryTypes.HealthCheck)}>
          Add New Health Check Entry
        </Button>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
