window.getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
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
        longitude =  parseFloat(longitude);
        const map = L.map("map").setView([latitude, longitude], 22);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`${latitude}, ${longitude}`).openPopup();
    } catch (error) {
        console.error("Error fetching location:", error);
    }
}
