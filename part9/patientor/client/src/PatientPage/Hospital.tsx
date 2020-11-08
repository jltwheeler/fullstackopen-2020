import React from "react";
import { Icon, Segment } from "semantic-ui-react";

import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }, _dispatch] = useStateValue();
  return (
    <Segment>
      <h3>
        {entry.date} <Icon name="hospital" size="big" />
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
      <div>Discharge date : {entry.discharge.date}</div>
      <div>Discharge criteria : {entry.discharge.criteria}</div>
    </Segment>
  );
};

export default Hospital;
