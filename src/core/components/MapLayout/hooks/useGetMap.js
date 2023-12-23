import { useState } from "react";
import axios from "axios";

export const useGetMap = (onAddMapPoints) => {
  const [pointCoordinates, setPointCoordinates] = useState();
  const [foundResults, setFoundResult] = useState([]);
  const [isLocalSearch, setIsLocalSearch] = useState(false);

  const onChangePointCoordinates = (coordinates) => {
    setPointCoordinates(coordinates);
  };

  const onStartSearching = async () => {
    const response = await axios.post("http://localhost:5001/handling", {
      ...pointCoordinates,
      isLocalSearch: +isLocalSearch,
    });

    const { entities } = response.data;

    const parsedEntities = JSON.parse(entities);

    setFoundResult(parsedEntities);
    onAddMapPoints(parsedEntities);
  };

  const onChangeSearchType = () => {
    setIsLocalSearch(!isLocalSearch);
  };

  return {
    isLocalSearch,
    onChangeSearchType,
    onChangePointCoordinates,
    onStartSearching,
    pointCoordinates,
    foundResults,
  };
};
