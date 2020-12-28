
import { Deck } from "@deck.gl/core";
import { MapboxLayer } from '@deck.gl/mapbox';
import { GeoJsonLayer } from "@deck.gl/layers";
import { EditableGeoJsonLayer } from "@nebula.gl/layers";
import { DrawPolygonMode } from "@nebula.gl/edit-modes";


var myFeatureCollection = {
    type: "FeatureCollection",
    features: []
  };

  let editableGeojsonLayer = new EditableGeoJsonLayer({
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
     // deck.setProps({ layers: getLayers() });
    }
  })
  
// let tripLayer = new MapboxLayer({
//     id: 'trips-layer',
//     type: TripsLayer,
//     data: 'tripUrl',
//     getPath: d => d.path,
//     getTimestamps: d => d.timestamps,
//     getColor: d => (d.vendor === 0 ? DEFAULT_THEME.trailColor0 : DEFAULT_THEME.trailColor1),
//     opacity: 0.3,
//     widthMinPixels: 2,
//     rounded: true,
//     trailLength,
//     currentTime: 0,
//     shadowEnabled: false
//   });