/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 2,
    center: { lat: -33.865427, lng: 151.196123 },
    mapTypeId: 'terrain',
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement('script');

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'test2.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function eqfeed_callback(results: any) {
  const heatmapData: google.maps.WeightedLocation[] = [];

  for (let i = 0; i < results.length; i++) {
    const coords = results[i];
    const latLng = new google.maps.LatLng(coords.LATITUDE, coords.LONGITUDE);

    heatmapData.push({location:latLng, weight:coords.cok_agir_hasarli_bina_sayisi});
  }

  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: map,
  });
  heatmap.set('radius', 0.05)
}

declare global {
  interface Window {
    initMap: () => void;
    eqfeed_callback: (results: any) => void;
  }
}
window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
export {};
