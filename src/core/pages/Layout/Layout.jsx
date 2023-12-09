import React from "react";
import { DatasetsList, SearchContainer, MapLayout } from "../../components";
import { useDatasets, useUsers } from "../../hooks";
import "./Layout.css";

// Main component to contain all parts of app
export const Layout = () => {
  // hook to manipulate with databases (records) to edit/delete/create etc, while getting actual datasets and available
  const {
    onRemoveDataset,
    onEditDataset,
    onSortDataset,
    onSearchDataset,
    onFilterDataset,
    onAddMapPoints,
    datasets,
  } = useDatasets();

  // hook to manipulate with users (switching, getting current user and their rights)
  const { isCurrentlyPublisher } = useUsers();

  return (
    <div>
      <div className="layout">
        {/* <SwitchUser
          currentUser={currentUser}
          onSwitchToConsumer={onSwitchToConsumer}
          onSwitchToPublisher={onSwitchToPublisher}
          isCurrentlyPublisher={isCurrentlyPublisher}
        /> */}
        {/* {isCurrentlyPublisher ? (
          <PublisherPanel onAddDataset={onAddDataset} />
        ) : (
          <div />
        )} */}
      </div>
      <MapLayout onAddMapPoints={onAddMapPoints} />
      <SearchContainer
        onSortDataset={onSortDataset}
        onFilterDataset={onFilterDataset}
        onSearchDataset={onSearchDataset}
        isCurrentlyPublisher={isCurrentlyPublisher}
      />
      <DatasetsList
        isCurrentlyPublisher={isCurrentlyPublisher}
        datasets={datasets}
        onRemoveDataset={onRemoveDataset}
        onEditDataset={onEditDataset}
      />
    </div>
  );
};
