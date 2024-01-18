import React, { useEffect } from "react";

// import { am4maps, am4core } from "@amcharts/amcharts4-geodata";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4WorldLowData from "@amcharts/amcharts4-geodata/worldLow";
import { Button, Typography } from "@mui/material";
import { useGetMap } from "./hooks";

import "./MapLayout.css";

export const MapLayout = ({ onAddMapPoints }) => {
  const {
    onChangePointCoordinates,
    onStartSearching,
    // onChangeSearchType,
    // isLocalSearch,
    pointCoordinates,
    foundResults,
  } = useGetMap(onAddMapPoints);

  const chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.geodata = am4WorldLowData;

  chart.projection = new am4maps.projections.Miller();

  const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ["AQ"];

  var imageSeries = chart.series.push(new am4maps.MapImageSeries());

  useEffect(() => {
    if (foundResults.length) {
      imageSeries.data = [
        ...foundResults.map(({ longitude, latitude, entityName }) => ({
          longitude,
          latitude,
          title: entityName,
        })),
        {
          longitude: pointCoordinates.longitude,
          latitude: pointCoordinates.latitude,
          title: "Ваша точка",
        },
      ];
    }
  }, [foundResults, imageSeries]);

  polygonSeries.propertyFields.fill = "fill";

  var imageSeriesTemplate = imageSeries.mapImages.template;
  var circle = imageSeriesTemplate.createChild(am4core.Circle);
  circle.radius = 4;
  circle.fill = am4core.color("#B27799");
  circle.stroke = am4core.color("#FFFFFF");
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.tooltipText = "{title}";

  imageSeriesTemplate.propertyFields.latitude = "latitude";
  imageSeriesTemplate.propertyFields.longitude = "longitude";

  chart.zoomControl = new am4maps.ZoomControl();

  chart.seriesContainer.events.on("hit", function (ev) {
    const newPoint = chart.svgPointToGeo(ev.svgPoint);
    onChangePointCoordinates(newPoint);
  });

  // const searchingType = isLocalSearch ? "Local searching" : "Global searching";

  return (
    <div className="mapContainer">
      {pointCoordinates ? (
        <>
          <div className="buttonsContainer">
            <Button
              variant="contained"
              color="primary"
              onClick={onStartSearching}
            >
              Искать госпитали
            </Button>
            {/* <Button
              variant={isLocalSearch ? "contained" : "outlined"}
              color={isLocalSearch ? "primary" : "success"}
              onClick={onChangeSearchType}
            >
              {searchingType}
            </Button> */}
          </div>
          <Typography>
            широта: {pointCoordinates.longitude}
            <br />
            долгота: {pointCoordinates.latitude}
          </Typography>
        </>
      ) : null}
      <div id="chartdiv" className="chartdiv">
        map
      </div>
    </div>
  );
};
