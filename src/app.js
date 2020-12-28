import mapboxgl from "mapbox-gl";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import { MapboxLayer } from "@deck.gl/mapbox";
import { EditableGeoJsonLayer } from "@nebula.gl/layers";
import { DrawPolygonMode } from "@nebula.gl/edit-modes";
import { Deck } from "@deck.gl/core";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibGltemdpc2VyIiwiYSI6ImNqZXFvemJlcjB1bWYyd2x0eGxjeGdvcXIifQ.gSsj63R-2VZV7L7mpSw0Uw";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  interactive: false,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch,
});

var myFeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

const deck = new Deck({
  canvas: "deck-canvas",
  width: "100%",
  height: "100%",
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  onViewStateChange: ({ viewState }) => {
    map.jumpTo({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch,
    });
  },
  layers: getLayers(),
});
function getLayers() {
  const layers = [
    new EditableGeoJsonLayer({
      id: "nebula",
      data: myFeatureCollection,
      selectedFeatureIndexes: [],
      mode: DrawPolygonMode,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      extruded: true,
      getElevation: 1000,
      getFillColor: [200, 0, 80, 180],

      // Interactive props
      pickable: true,
      autoHighlight: true,

      onEdit: ({ updatedData, editType, featureIndexes, editContext }) => {
        myFeatureCollection = updatedData;
        deck.setProps({ layers: getLayers() });
      },
    }),
  ];

  return layers;
}
