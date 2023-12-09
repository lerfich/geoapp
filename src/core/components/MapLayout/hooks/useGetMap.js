import { useState } from "react";
import axios from "axios";

export const useGetMap = (onAddMapPoints) => {
  const [pointCoordinates, setPointCoordinates] = useState();

  const onChangePointCoordinates = (coordinates) => {
    setPointCoordinates(coordinates);
  };

  const onStartSearching = async () => {
    //TODO: await fetch request to get array data
    const response = await axios.post(
      "http://localhost:5001/handling",
      pointCoordinates
    );

    const { entities, title } = response.data;

    const parsedEntities = JSON.parse(entities);

    // console.log({ title, parsedEntities }, "result");

    onAddMapPoints(parsedEntities);
  };

  return { onChangePointCoordinates, onStartSearching, pointCoordinates };
};
