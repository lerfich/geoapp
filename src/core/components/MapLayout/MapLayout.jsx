import React from "react";

// import { am4maps, am4core } from "@amcharts/amcharts4-geodata";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4WorldLowData from "@amcharts/amcharts4-geodata/worldLow";
import { Button } from "@mui/material";
import { useGetMap } from "./hooks";

import "./MapLayout.css";

export const MapLayout = () => {
  const { onChangePointCoordinates, onStartSearching, pointCoordinates } =
    useGetMap();

  console.log(am4WorldLowData, "data");

  const chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.geodata = am4WorldLowData;
  chart.projection = new am4maps.projections.Miller();

  const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ["AQ"];

  chart.zoomControl = new am4maps.ZoomControl();

  chart.seriesContainer.events.on("hit", function (ev) {
    const newPoint = chart.svgPointToGeo(ev.svgPoint);
    onChangePointCoordinates(newPoint);
  });

  return (
    <div className="mapContainer">
      {pointCoordinates ? (
        <Button variant="contained" color="primary" onClick={onStartSearching}>
          Search for hospitals
        </Button>
      ) : null}
      <div id="chartdiv" className="chartdiv">
        map
      </div>
    </div>
  );
};
