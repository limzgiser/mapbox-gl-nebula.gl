import mapboxgl from "mapbox-gl";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode
} from 'mapbox-gl-draw-circle';

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
  // interactive: false,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch,
});
var draw = new MapboxDraw({
  modes: {
    ...MapboxDraw.modes,
    draw_circle  : CircleMode,
    drag_circle  : DragCircleMode,
    draw_rectangle :DrawRectangle,
    direct_select: DirectMode,
    simple_select: SimpleSelectMode
  }
});

map.addControl(draw);

map.on("draw.create", updateArea);
map.on("draw.delete", updateArea);
map.on("draw.update", updateArea);

function updateArea(e) {
  console.log(e);
}

document.getElementById("test01").onclick = function (e) {
  draw.changeMode("draw_point");
};

document.getElementById("test02").onclick = function (e) {
  draw.changeMode("draw_line_string");
};

document.getElementById("test03").onclick = function (e) {
  draw.changeMode("draw_polygon");
};
document.getElementById("test04").onclick = function (e) {
  draw.changeMode("drag_circle");
};
document.getElementById("test05").onclick = function (e) {
  draw.changeMode("draw_rectangle");
};
