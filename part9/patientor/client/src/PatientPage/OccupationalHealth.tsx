import React from "react";
import { Icon, Segment } from "semantic-ui-react";

import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealth: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
  entry,
}) => {
  const [{ diagnoses }, _dispatch] = useStateValue();
  return (
    <Segment>
      <h3>
        {entry.date} <Icon name="stethoscope" size="big" />
      </h3>
      <div>
        <em>{entry.description}</em>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((item) => item.code === code)?.name}
          </li>
        ))}
      </ul>
      <div>Employer: {entry.employerName}</div>
      {entry?.sickLeave && (
        <div>Sick leave start date: {entry?.sickLeave?.startDate}</div>
      )}
      {entry?.sickLeave && (
        <div>Sick leave end date: {entry?.sickLeave?.endDate}</div>
      )}
    </Segment>
  );
};

export default OccupationalHealth;
