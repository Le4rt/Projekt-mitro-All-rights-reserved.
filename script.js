let toggle = true;

document.querySelectorAll('.lh-place').forEach(place => {
    place.addEventListener('click', () => {
        place.style.backgroundColor = toggle ? '#FFFFFF' : '#000000';
        toggle = !toggle;
    });
});

document.querySelectorAll('.lh-place12').forEach(place => {
    place.addEventListener('click', () =>{
        place.style.backgroundColor = getRandomColor();
    });
});

function getRandomColor(){
    const letters ='0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i<6; i++){
        color +=letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'alert alert-primary text-center'; // Bootstrap classes 
    welcomeMessage.style.margin = '20px auto';
    welcomeMessage.style.width = '80%';
    welcomeMessage.style.fontSize = '1.5rem';

    if (window.location.pathname.includes("place1.html")) {
        welcomeMessage.textContent = "Welcome to Prishtina - The Heart of Kosovo!";
    } else if (window.location.pathname.includes("place2.html")) {
        welcomeMessage.textContent = "Welcome to Peja - Explore the Beauty of Rugova Gorge!";
    } else if (window.location.pathname.includes("place3.html")) {
        welcomeMessage.textContent = "Welcome to Vushtrria - Discover the Ancient Charm!";
    }

    if (welcomeMessage.textContent) {
        document.body.prepend(welcomeMessage);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const mapDiv = document.getElementById("map");

    if (mapDiv) {
        let mapCenter;
        let mapZoom = 13; // Zoom level

        // Kordinatat e Qyteteve
        if (window.location.pathname.includes("place1.html")) {
            mapCenter = [42.6629, 21.1655]; // Prishtina
        } else if (window.location.pathname.includes("place2.html")) {
            mapCenter = [42.6591, 20.2886]; // Peja
        } else if (window.location.pathname.includes("place3.html")) {
            mapCenter = [42.8239, 20.9679]; // Vushtrria
        }

        
        const map = L.map("map").setView(mapCenter, mapZoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Nje marker per Qytetin
        L.marker(mapCenter).addTo(map).bindPopup("Welcome! Explore the city.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const weatherDiv = document.getElementById("weather-data");

    if (weatherDiv) {
        let cityId;

        if (window.location.pathname.includes("place1.html")) {
            cityId = 786712; // Prishtina
        } else if (window.location.pathname.includes("place2.html")) {
            cityId = 786449; // Peja
        } else if (window.location.pathname.includes("place3.html")) {
            cityId = 785202; // Vushtrri
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data && data.main) {
                    const temp = data.main.temp;
                    const weather = data.weather[0].description;
                    const icon = data.weather[0].icon;

                    weatherDiv.innerHTML = `
                        <div class="weather-container text-center">
                            <h4>Weather in ${data.name}</h4>
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}" />
                            <p>Temperature: <strong>${temp}°C</strong></p>
                            <p>Condition: <strong>${weather}</strong></p>
                        </div>
                    `;
                } else {
                    weatherDiv.innerHTML = "<p>Weather data not available.</p>";
                }
            })
            .catch(err => {
                weatherDiv.innerHTML = "<p>Error fetching weather data.</p>";
                console.error(err);
            });
    }
});

