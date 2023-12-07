import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { nanoid } from "nanoid";
import { DatasetFormModal } from "../DatasetFormModal";
import { DEFAULT_DATASET } from "../../constants";
import "./PublisherPanel.css";

// Component to create new datasets, available only for Publisher
export const PublisherPanel = ({ onAddDataset }) => {
  // simple store to save state of creating dataset modal (open/close)
  const [isDatasetCreationModalOpen, setIsDatasetCreateModalOpen] =
    useState(false);

  // function to open modal
  const onOpenDatasetCreateModal = () => {
    setIsDatasetCreateModalOpen(true);
  };

  // function to close modal
  const onCloseDatasetCreateModal = () => {
    setIsDatasetCreateModalOpen(false);
  };

  // function to send data to creating function
  const onSubmitCreation = (submittingDataset) => {
    onAddDataset({ ...submittingDataset, id: nanoid() });
    onCloseDatasetCreateModal();
  };

  return (
    <div className="publisherPanel">
      <DatasetFormModal
        isModalOpen={isDatasetCreationModalOpen}
        form={DEFAULT_DATASET}
        onClose={onCloseDatasetCreateModal}
        onSubmitCreation={onSubmitCreation}
      />
      <Typography
        variant="h5"
        color="rebeccapurple"
        onClick={onOpenDatasetCreateModal}
      >
        Add new dataset
      </Typography>
      <div className="addNewDatasetButton">
        <IconButton
          color="secondary"
          fullWidth={true}
          onClick={onOpenDatasetCreateModal}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};
