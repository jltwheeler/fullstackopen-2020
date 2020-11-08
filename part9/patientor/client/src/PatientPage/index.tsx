import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

import { EntryFormValues } from "./AddEntryForm";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, setPatient, addEntry } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const newValues = { ...values, type: "Hospital" };
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
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
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <br />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
