import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export const useDatasets = () => {
  // simple store to contain all initial datasets
  const [datasets, setDatasets] = useState([]);

  // simple store to return while sorting, filtering, searching. Needed cause we cant make all operations
  // on default datasets or we won't be able to get first iteration array.
  // (I.E when filtering you will get subarray and wont be able to turn back to initail array if doesn't have a copy)
  const [results, setResults] = useState([]);

  // getting only available datasets for consumers
  const availableDatasets = datasets.filter(({ isAvailable }) => isAvailable);

  const onAddMapPoints = (mapPoints) => {
    setDatasets(mapPoints.map((item) => ({ ...item, id: nanoid() })));
  };

  // function to remove dataset by id
  const onRemoveDataset = (datasetId) => {
    setDatasets((prev) => prev.filter(({ id }) => id !== datasetId));
  };

  // function to edit details
  const onEditDataset = (editedDataset) => {
    setDatasets((prev) =>
      prev.map((oldDataset) =>
        oldDataset.id === editedDataset.id ? { ...editedDataset } : oldDataset
      )
    );
  };

  // function to sort dataset. Implemented only by title but possible other options. Default alphabetical sort.
  const onSortDataset = (order, type) => {
    switch (order) {
      case "asc": {
        if (type === "By name") {
          const sortingDataset = [...datasets];
          setResults(
            sortingDataset.sort((datasetA, datasetB) =>
              datasetA.entityName > datasetB.entityName ? 1 : -1
            )
          );
        } else {
          const sortingDataset = [...datasets];
          setResults(
            sortingDataset.sort((datasetA, datasetB) =>
              datasetA.distance > datasetB.distance ? 1 : -1
            )
          );
        }
        break;
      }
      case "desc": {
        if (type === "By name") {
          const sortingDataset = [...datasets];
          setResults(
            sortingDataset.sort((datasetA, datasetB) =>
              datasetA.entityName > datasetB.entityName ? -1 : 1
            )
          );
        } else {
          const sortingDataset = [...datasets];
          setResults(
            sortingDataset.sort((datasetA, datasetB) =>
              datasetA.distance > datasetB.distance ? -1 : 1
            )
          );
        }
        break;
      }
      // while initial return default (stored) array
      case "initial": {
        setResults(datasets);
      }
    }
  };

  // function to search the default dataset
  const onSearchDataset = (searchString) => {
    if (searchString) {
      setResults(
        datasets.filter(({ entityName }) => entityName.includes(searchString))
      );
    } else {
      // return initial array when search string is empty
      setResults(datasets);
    }
  };

  // filter for 'availability' , available only for publishers, because consumers only see the available records.
  const onFilterDataset = (value, type) => {
    switch (type) {
      case "isAvailable": {
        if (value.isAvailable) {
          setResults(
            datasets.filter(
              ({ isAvailable }) => isAvailable === value.isAvailable
            )
          );
        } else {
          setResults(datasets);
        }
        break;
      }
      default:
        setResults(datasets);
        break;
    }
  };

  //   distance
  // :
  // 2588.2203369180484
  // entityName
  // :
  // "Hopsital of St.Angeles"
  // latitude
  // :
  // 59.21287123
  // longitude
  // :
  // 31.6123

  // if we change the initial datasets array we have to change the results (for sorting, filtering etc) as well
  useEffect(() => {
    setResults(datasets);
  }, [datasets]);

  return {
    onAddMapPoints,
    onSortDataset,
    onSearchDataset,
    onRemoveDataset,
    onEditDataset,
    onFilterDataset,
    datasets: results,
    availableDatasets,
  };
};
