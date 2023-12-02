import { useState } from "react";

export const useGetMap = () => {
  const [pointCoordinates, setPointCoordinates] = useState();

  const onChangePointCoordinates = (coordinates) => {
    setPointCoordinates(coordinates);
  };

  const onStartSearching = () => {
    //TODO: await fetch request to get array data
    // await fetch({})
    console.log(pointCoordinates, "sending coordinates");
  };

  return { onChangePointCoordinates, onStartSearching, pointCoordinates };
};
