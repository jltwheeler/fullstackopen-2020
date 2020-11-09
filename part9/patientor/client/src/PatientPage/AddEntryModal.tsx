import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";
import { EntryTypes } from "../types";

interface Props {
  modalOpen: boolean;
  entryType: EntryTypes;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  entryType,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new {entryType} entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm
        entryType={entryType}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
