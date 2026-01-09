window.getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    reject(error.message);
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

window.initializeMap = async (latitude, longitude) => {
    try {
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        window.map = L.map("map").setView([latitude, longitude], 22);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles © Esri'
        }).addTo(window.map);

        window.marker = L.marker([latitude, longitude]).addTo(window.map);
        await window.moveLocationMarker(latitude, longitude);
    } catch (error) {
        console.error("Error fetching location:", error);
    }
}

window.moveLocationMarker = async (latitude, longitude) => {
    if (window.marker) {
        window.marker.setLatLng([latitude, longitude]);
        window.map.setView([latitude, longitude], 22);
    } else {
        console.error("Marker does not exist. Ensure initializeMap has been called first.");
    }
}

window.drawLine = async (lat1, lon1, lat2, lon2) => {
    const latLng1 = [lat1, lon1];
    const latLng2 = [lat2, lon2];
    L.polygon([latLng1, latLng2]).addTo(window.map);


    if(!(lat1 == lat2 && lon1 == lon2)) {
        const rotation = calculateRotation(lat1, lon1, lat2, lon2);
        window.marker.setIcon(createLocationMarkerIcon(rotation));
    }
}


function createLocationMarkerIcon(rotation) {
    return L.divIcon({
        className: "custom-marker",
        html: `<div style="transform: rotate(${rotation}deg); transform-origin: 15px 30px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><path fill="#ff0000" d="m16 4.438l-.906 2.187l-8 19l-.907 2.125l2.157-.813L16 24.063l7.656 2.875l2.157.813l-.907-2.125l-8-19zm0 5.093l6.188 .844-2.188l-.344-.125l-.344.125l-5.844 2.188z"/></svg>
            </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
}

function calculateRotation(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    var φ1 = lat1 * Math.PI / 180; // Latitude of point 1 in radians
    var φ2 = lat2 * Math.PI / 180; // Latitude of point 2 in radians
    var Δλ = (lon2 - lon1) * Math.PI / 180; // Difference in longitude in radians

    // Calculate bearing
    var x = Math.sin(Δλ) * Math.cos(φ2);
    var y = Math.cos(φ1) * Math.sin(φ2) - (Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ));
    var θ = Math.atan2(x, y); // Bearing in radians

    // Convert bearing from radians to degrees
    var bearing = (θ * 180 / Math.PI + 360) % 360; // Normalize to 0-360°

    return bearing;
}