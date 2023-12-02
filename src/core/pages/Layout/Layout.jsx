import React from "react";
import {
  SwitchUser,
  DatasetsList,
  PublisherPanel,
  SearchContainer,
  MapLayout,
} from "../../components";
import { useDatasets, useUsers } from "../../hooks";
import "./Layout.css";

// Main component to contain all parts of app
export const Layout = () => {
  // hook to manipulate with databases (records) to edit/delete/create etc, while getting actual datasets and available
  const {
    onAddDataset,
    onRemoveDataset,
    onEditDataset,
    onSortDataset,
    onSearchDataset,
    onFilterDataset,
    datasets,
    availableDatasets,
  } = useDatasets();

  // hook to manipulate with users (switching, getting current user and their rights)
  const {
    currentUser,
    isCurrentlyPublisher,
    onSwitchToPublisher,
    onSwitchToConsumer,
  } = useUsers();

  return (
    <div>
      <div className="layout">
        <SwitchUser
          currentUser={currentUser}
          onSwitchToConsumer={onSwitchToConsumer}
          onSwitchToPublisher={onSwitchToPublisher}
          isCurrentlyPublisher={isCurrentlyPublisher}
        />
        {isCurrentlyPublisher ? (
          <PublisherPanel onAddDataset={onAddDataset} />
        ) : (
          <div />
        )}
      </div>
      <MapLayout />
      <SearchContainer
        onSortDataset={onSortDataset}
        onFilterDataset={onFilterDataset}
        onSearchDataset={onSearchDataset}
        isCurrentlyPublisher={isCurrentlyPublisher}
      />
      <DatasetsList
        isCurrentlyPublisher={isCurrentlyPublisher}
        datasets={isCurrentlyPublisher ? datasets : availableDatasets}
        onRemoveDataset={onRemoveDataset}
        onEditDataset={onEditDataset}
      />
    </div>
  );
};
