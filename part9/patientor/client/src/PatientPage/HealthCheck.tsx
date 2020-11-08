import React from "react";
import { Icon, Segment } from "semantic-ui-react";

import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }, _dispatch] = useStateValue();

  const getHeartColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  return (
    <Segment>
      <h3>
        {entry.date} <Icon name="user md" size="big" />
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
      <div>
        <Icon name="heart" color={getHeartColor()} />
      </div>
    </Segment>
  );
};

export default HealthCheck;
