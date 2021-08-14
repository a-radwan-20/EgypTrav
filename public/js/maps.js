mapboxgl.accessToken = mapToken;
console.log(places.geoLocation.coordinates)
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: places.geoLocation.coordinates, // starting position [lng, lat]
zoom: 5 // starting zoom

});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(places.geoLocation.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 20})
        .setHTML(
            `<h6>${places.name}</h6><p>${places.location}</p>`
        )
    )
    .addTo(map)


//JSON.parse(place.geoLocation.coordinates) [-74.5, 40]