import React, { useEffect, useState } from "react";

import {
  Select,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";

import { sortOptions, sortType } from "../../constants";
import "./SearchContainer.css";

// Component for search, filter, sort
export const SearchContainer = ({
  onSortDataset,
  onSearchDataset,
  onFilterDataset,
  isCurrentlyPublisher,
}) => {
  // simple store to save current search string
  const [searchString, setSearchString] = useState("");
  // simple store to save current sort option
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  // simple store to save current filter option
  const [filterOption, setFilterOption] = useState(false);

  // function to change the search string on type
  const onSearchChange = (e) => {
    const targetString = e.target.value;

    setSearchString(targetString);
  };

  // function to handle the sort option on change
  const handleSortChange = (e) => {
    const newOption = e.target.value;

    if (newOption) {
      setSortOption(newOption);
    }
  };

  // function to handle the filter option on change
  const onChangeAvailabilityFilter = (e) => {
    const checked = e.target.checked;
    setFilterOption(checked);
  };

  // if change search string we have to start searching across datasets
  useEffect(() => {
    onSearchDataset(searchString);
  }, [searchString]);

  // if change sort option we have to start sorting across datasets
  useEffect(() => {
    onSortDataset(sortOption, sortType.title);
  }, [sortOption]);

  // if change filter option we have to start filtering across datasets
  useEffect(() => {
    if (isCurrentlyPublisher) {
      onFilterDataset({ isAvailable: filterOption }, "isAvailable");
    } else {
      // If you are not publisher, you cant see unavailable datasets
      onFilterDataset({}, undefined);
    }
  }, [filterOption, isCurrentlyPublisher]);

  return (
    <div className="searchContainer">
      <TextField
        variant="outlined"
        label="Search field"
        value={searchString}
        onChange={onSearchChange}
        fullWidth={true}
      />
      {isCurrentlyPublisher ? (
        <div className="filterAvailableSwitch">
          <Typography variant="h5" color={filterOption ? "blue" : "gray"}>
            Filter only available
          </Typography>
          <Switch
            checked={filterOption}
            onChange={onChangeAvailabilityFilter}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      ) : (
        <div />
      )}
      <FormControl fullWidth={true}>
        <InputLabel>Sort</InputLabel>
        <Select value={sortOption} label="Sort" onChange={handleSortChange}>
          {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
