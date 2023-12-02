import React from "react";
import { DatasetCard } from "./DatasetCard.jsx";
import "./DatasetList.css";
import { Typography } from "@mui/material";

// Component to show a list of all datasets
export const DatasetsList = ({
  datasets,
  isCurrentlyPublisher,
  onRemoveDataset,
  onEditDataset,
}) => {
  return (
    <div className="container">
      {datasets.length ? (
        datasets.map((dataset) => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            isCurrentlyPublisher={isCurrentlyPublisher}
            onRemoveDataset={onRemoveDataset}
            onEditDataset={onEditDataset}
          />
        ))
      ) : (
        <div className="emptyContainer">
          <Typography variant="h5" color="grey">
            Seems there`s no any datasets exist. Try add new one, if you`re
            &nbsp;
          </Typography>
          <Typography variant="h5" color="goldenrod">
            Publisher
          </Typography>
        </div>
      )}
    </div>
  );
};
