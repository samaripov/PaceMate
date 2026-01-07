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

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
        window.marker.bindPopup(`${latitude}, ${longitude}`).openPopup();
        window.map.setView([latitude, longitude], 22);
    } else {
        console.error("Marker does not exist. Ensure initializeMap has been called first.");
    }
}

window.drawLine = async (latitude1, longitude1, latitude2, longitude2) => {
    const latLng1 = [latitude1, longitude1];
    const latLng2 = [latitude2, longitude2];
    L.polygon([latLng1, latLng2]).addTo(window.map);
}