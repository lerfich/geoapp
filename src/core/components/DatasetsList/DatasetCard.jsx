import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { DatasetFormModal } from "../DatasetFormModal";
import "./DatasetList.css";

// Component of single card containing all info and function related to one dataset.
export const DatasetCard = ({
  dataset,
  isCurrentlyPublisher,
  onRemoveDataset,
  onEditDataset,
}) => {
  // simple store to save open/close state of edition modal
  const [isDatasetEditionModalOpen, setIsDatasetEditionModalOpen] =
    useState(false);

  // simple store to save state of description (might be shown of hidden)
  const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);

  // function to open edition modal
  const onDatasetEditionModalOpen = () => {
    setIsDatasetEditionModalOpen(true);
  };

  // function to close edition modal
  const onDatasetEditionModalClose = () => {
    setIsDatasetEditionModalOpen(false);
  };

  // function to show description
  const onOpenDatasetDescription = () => {
    setIsDescriptionOpened(true);
  };

  // function to hide description
  const onCloseDatasetDescription = () => {
    setIsDescriptionOpened(false);
  };

  // function to invoke dataset deletion
  const handleDeleteDataset = (datasetId) => {
    onRemoveDataset(datasetId);
  };

  // function to start editing dataset details (invokes opening of edition modal)
  const handleEditDataset = () => {
    onDatasetEditionModalOpen();
  };

  // function save edited data in edition modal
  const onSubmitCreation = (editingDataset) => {
    onEditDataset({ ...editingDataset });
    onDatasetEditionModalClose();
  };

  let descriptionText = "Show descrtiption";
  // depending on state of description (open/close) it contains 'close' or 'open' functions
  let handleDescriptionStatus = onOpenDatasetDescription;
  let descriptionButtonColor = "success";

  if (isDescriptionOpened) {
    descriptionText = "Hide description";
    handleDescriptionStatus = onCloseDatasetDescription;
    descriptionButtonColor = "secondary";
  }

  const description = dataset.description;

  // flatting the array of words for batches to display on differen lines
  const multiLineDescription = description
    ? description
        .split(" ")
        .flatMap((word, index) => ((index + 1) % 7 === 0 ? [word, "\n"] : word))
        .join(" ")
    : "Empty description";

  const title =
    dataset.title.length > 30 ? dataset.title + "..." : dataset.title;

  return (
    <div className="datasetCard">
      <div className="datasetText">
        <Typography variant="h4">Title: {title}</Typography>
        {isDescriptionOpened ? (
          <Typography variant="body1" className="displayLinebreak">
            Description: {multiLineDescription}
          </Typography>
        ) : null}
      </div>
      <div className="datasetButtons">
        {isCurrentlyPublisher ? (
          <div className="editDeleteButtons">
            <IconButton onClick={() => handleDeleteDataset(dataset.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditDataset}>
              <EditIcon />
            </IconButton>
          </div>
        ) : (
          <div />
        )}
        <Button
          variant="outlined"
          color={descriptionButtonColor}
          title="description"
          onClick={handleDescriptionStatus}
        >
          {descriptionText}
        </Button>
      </div>
      <DatasetFormModal
        isModalOpen={isDatasetEditionModalOpen}
        form={dataset}
        onClose={onDatasetEditionModalClose}
        onSubmitCreation={onSubmitCreation}
      />
    </div>
  );
};
