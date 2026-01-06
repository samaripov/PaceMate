window.getCurrentLocation = function () {
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
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            reject({
                        latitude: 0,
                        longitude: 0,
                        accuracy: -1
                    });
        }
    });
}