import React, { useEffect, useState } from "react";

import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { DEFAULT_DATASET } from "../../constants";

import "./DatasetFormModal.css";

// Reused component for edition/creating new dataset
export const DatasetFormModal = ({
  isModalOpen,
  onClose,
  form,
  onSubmitCreation,
}) => {
  // simple store to get the initial dataset to edit(getting already saved details)/create(getting default settings for new dataset)
  const [dataset, setDataset] = useState(DEFAULT_DATASET);

  // function to update details if changed
  useEffect(() => {
    setDataset(form);
  }, [form]);

  // function to update title on change
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setDataset((prev) => ({ ...prev, title }));
  };

  // function to update description on change
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDataset((prev) => ({ ...prev, description }));
  };

  // function to update availability on change
  const onChangeAvailability = (e) => {
    const isAvailable = e.target.checked;

    setDataset((prev) => ({ ...prev, isAvailable }));
  };

  // function to operate with handlers easier, used in big applications
  const onChangeForm = (e, field) => {
    switch (field) {
      case "title": {
        onChangeTitle(e);
        break;
      }
      case "description": {
        onChangeDescription(e);
        break;
      }
      case "isAvailable": {
        onChangeAvailability(e);
        break;
      }
      default:
        break;
    }
  };

  // function to save the details for editiong/creating of dataset
  const handleSubmit = () => {
    onSubmitCreation(dataset);
    setDataset(form);
  };

  // function to close modal, In the end always changing to initial setting so it want has any bugs
  const onModalClose = () => {
    onClose();
    setDataset(form);
  };

  const isTitleFilled = dataset.entityName;
  // const isDescriptionFilled = dataset.description;

  const isAllFilled = isTitleFilled;

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <div>
        <Box className="modal">
          <div className="modalForm">
            <div className="modalFormField">
              <Typography variant="h6" color={isTitleFilled ? "green" : "grey"}>
                Title
              </Typography>
              <TextField
                required
                fullWidth={true}
                label="title"
                multiline
                rows={1}
                value={dataset.entityName}
                onChange={(e) => onChangeForm(e, "entityName")}
                variant="outlined"
              />
            </div>
            {/* <div className="modalFormField">
              <Typography
                variant="h6"
                color={isDescriptionFilled ? "green" : "grey"}
              >
                Description
              </Typography>
              <TextField
                label="description"
                value={dataset.description}
                fullWidth={true}
                multiline
                rows={3}
                onChange={(e) => onChangeForm(e, "description")}
                variant="outlined"
              />
            </div> */}
            {/* <div className="modalFormField">
              <Typography variant="h6" color="green">
                Availability (Y/N)
              </Typography>
              <Switch
                checked={dataset.isAvailable}
                onChange={(e) => onChangeForm(e, "isAvailable")}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div> */}
          </div>

          {isAllFilled ? (
            <Button
              color="success"
              title="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Create new dataset
            </Button>
          ) : null}
        </Box>
      </div>
    </Modal>
  );
};
