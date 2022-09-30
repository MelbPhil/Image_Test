var transformRequest = (url, resourceType) => {
var isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
var isGithubRequest =
    url.slice(8, 17) === "github.com";
return {
    url: isMapboxRequest
    ? url.replace("?", "?pluginName=sheetMapper&")
    // : isGithubRequest
    // ? url.replace("?", "?token=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")
    : url
    // headers: "Authorization : token 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",
    // credentials: 'include'
};
};
//YOUR TURN: add your Mapbox token

mapboxgl.accessToken = mapBoxToken;
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v10', // YOUR TURN: choose a style: https://docs.mapbox.com/api/maps/#styles
    center: [-118.383720, 34.084340], // starting position [lng, lat]
    zoom: 12, // starting zoom
    // transformRequest: transformRequest
});

    // Add the GeoSearch to the map.
    map.addControl(
    new MapboxGeocoder({
    accessToken: mapBoxToken,
    mapboxgl: mapboxgl
    })
    );  

map.on('load', () => {
    // Load an image from an external URL.
    map.loadImage(
        'file:///Users/melphillips/Desktop/dg.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('DG', image);

            // Add a data source containing one point feature.
            map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-118.383720, 34.084340]
                            }
                        }
                    ]
                }
            });

            // Add a layer to use the image to represent the data.
            const startUp = map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point', // reference the data source
                'layout': {
                    'icon-image': 'DG', // reference the image
                    'icon-size': 1
                }
            });
        }
    );
});

setTimeout(function(startUp) {
    map.flyTo({
        center: [-95.320, 38.240],
        zoom: 3.5,
        essential: true
    })
},3000);

// const map.flyTo = async () => {
// const result = await map.addLayer()
// 		center: [-95.320, 38.240],
// 		zoom: 3.5,
// 		essential: true
// }

// $(document).ready(function() {
//     $.ajax({
//     type: "GET",
//     //YOUR TURN: Replace with csv export link
//     url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSaqY45_J4-9wOT5zqMy_KXSGpFxVMyBbdCELWZUixcBfnsSZF3Kf_Cv4gNsTCmOnonOkfFAhwRwA5R/pub?gid=0&single=true&output=csv',
//     dataType: "text",
//     success: function(csvData) {
//         makeGeoJSON(csvData);
//     }
//     });


//     function makeGeoJSON(csvData) {
//     csv2geojson.csv2geojson(csvData, {
//         latfield: 'lat',
//         lonfield: 'long',
//         delimiter: ','
//     }, function(err, data) {
//         map.on('load', function() {

//         //Add the the layer to the map
//         map.addLayer({
//             'id': 'csvData',
//             'type': 'circle',
//             'source': {
//             'type': 'geojson',
//             'data': data
//             },
//             'paint': {
//             'circle-radius': 5,
//             'circle-color': "purple"
//             }
//         });


//         // When a click event occurs on a feature in the csvData layer, open a popup at the
//         // location of the feature, with description HTML from its properties.
//         map.on('click', 'csvData', function(e) {
//             var coordinates = e.features[0].geometry.coordinates.slice();

//             //set popup text
//             //You can adjust the values of the popup to match the headers of your CSV.
//             // For example: e.features[0].properties.Name is retrieving information from the field Name in the original CSV.
//             var description = `<h3>` + e.features[0].properties.Name + `</h3>` + `<h4>` + `<b>` + `Address: ` + `</b>` + e.features[0].properties.Address + `</h4>` + `<h4>` + `<b>` + `Phone: ` + `</b>` + e.features[0].properties
//             .Phone + `</h4>`;

//             // Ensure that if the map is zoomed out such that multiple
//             // copies of the feature are visible, the popup appears
//             // over the copy being pointed to.
//             while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//             }

//             //add Popup to map

//             new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(description)
//             .addTo(map);
//         });

//         // Change the cursor to a pointer when the mouse is over the places layer.
//         map.on('mouseenter', 'csvData', function() {
//             map.getCanvas().style.cursor = 'pointer';
//         });

//         // Change it back to a pointer when it leaves.
//         map.on('mouseleave', 'places', function() {
//             map.getCanvas().style.cursor = '';
//         });

//         var bbox = turf.bbox(data);
//         map.fitBounds(bbox, {
//             padding: 50
//         });

//         });

//     });
//     };
// });