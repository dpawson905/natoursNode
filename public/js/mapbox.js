/* eslint-disable */
const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZHBhd3NvbjkwNSIsImEiOiJjam1ucXMzdnYwZmFkM3BsdWh3cTducmFnIn0.EOJQd5gfP0xCZOaAD41big';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dpawson905/ckehubb9b0zp719r26pn8k29w',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
