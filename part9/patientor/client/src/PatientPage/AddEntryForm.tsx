import React, { ReactElement, useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state/state";
import {
  EntryTypes,
  NewEntry,
  HealthCheckRating,
  HealthCheckEntry,
} from "../types";
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<NewEntry, "type">;

interface Props {
  entryType: EntryTypes;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const isDate = (date: string): boolean => {
  const regex = /\d\d\d\d-\d\d-\d\d/;
  if (!date.match(regex)) return false;

  return true;
};

const isHealthCheckRating = (param: any): param is HealthCheckEntry => {
  return Object.values(HealthCheckRating).includes(param);
};

const AddEntryForm: React.FC<Props> = ({ entryType, onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const [{ renderFields }, setRenderFields] = useState<{
    renderFields: (() => ReactElement) | null;
  }>({ renderFields: null });

  useEffect(() => {
    switch (entryType) {
      case EntryTypes.HealthCheck: {
        setRenderFields({
          renderFields: () => {
            return (
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            );
          },
        });

        break;
      }
      case EntryTypes.Hospital: {
        setRenderFields({
          renderFields: () => {
            return (
              <div>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />

                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
                <br />
              </div>
            );
          },
        });
        break;
      }
      case EntryTypes.OccupationalHealth: {
        setRenderFields({
          renderFields: () => {
            return (
              <div>
                <Field
                  label="Employer Name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                <br />
              </div>
            );
          },
        });
        break;
      }
      default:
        break;
    }
  }, []);

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 3,
        type: entryType,
        discharge: { date: "", criteria: "" },
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Date not in required YYYY-MM-DD format";
        let errors:
          | { [field: string]: string }
          | { [field: string]: { [subfield: string]: string } } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = dateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.type === EntryTypes.HealthCheck) {
          if (values.healthCheckRating === undefined) {
            errors.healthCheckRating = requiredError;
          }
          if (!isHealthCheckRating(values.healthCheckRating)) {
            errors.healthCheckRating = "Not a valid healthcheck rating";
          }
        }

        if (values.type === EntryTypes.Hospital) {
          if (!values.discharge.criteria) {
            errors = { ...errors, discharge: { criteria: requiredError } };
          }
          if (!values.discharge.date) {
            errors = { ...errors, discharge: { date: requiredError } };
          }
          if (!isDate(values.discharge.date)) {
            errors = { ...errors, discharge: { date: dateError } };
          }
        }

        if (values.type === EntryTypes.OccupationalHealth) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeave.startDate) {
            errors = { ...errors, sickLeave: { startDate: requiredError } };
          }
          if (!isDate(values.sickLeave.startDate)) {
            errors = { ...errors, sickLeave: { startDate: dateError } };
          }
          if (!values.sickLeave.endDate) {
            errors = { ...errors, sickLeave: { endDate: requiredError } };
          }
          if (!isDate(values.sickLeave.endDate)) {
            errors = { ...errors, sickLeave: { endDate: dateError } };
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {renderFields && renderFields()}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
