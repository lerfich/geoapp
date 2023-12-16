import { useState } from "react";
import axios from "axios";

export const useGetMap = (onAddMapPoints) => {
  const [pointCoordinates, setPointCoordinates] = useState();
  const [foundResults, setFoundResult] = useState([]);

  const onChangePointCoordinates = (coordinates) => {
    setPointCoordinates(coordinates);
  };

  const onStartSearching = async () => {
    const response = await axios.post(
      "http://localhost:5001/handling",
      pointCoordinates
    );

    const { entities } = response.data;

    const parsedEntities = JSON.parse(entities);

    setFoundResult(parsedEntities);
    onAddMapPoints(parsedEntities);
  };

  return {
    onChangePointCoordinates,
    onStartSearching,
    pointCoordinates,
    foundResults,
  };
};
