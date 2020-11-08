import React from "react";

import { Entry } from "../types";
import { assertNever } from "../utils";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealth from "./OccupationalHealth";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealth entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      assertNever(entry);
      return null;
  }
};

export default EntryDetails;
