import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, setPatient } from "../state";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
      </div>
    );
  } else {
    return null;
  }
};

export default PatientPage;
