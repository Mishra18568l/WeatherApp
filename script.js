document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "f80f041a0d3598273c1db99b7a688561";

    // Marking this function as async to use await inside
    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
            changeBackground(city);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        // Implement display logic here if needed
        const {name,main,weather}=data;
        cityName.textContent=name;
        temperatureDisplay.textContent= `Temperature : ${main.temp}`;
        descriptionDisplay.textContent=` Weather :${weather[0].description}`
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");

       
    }

    function showError() {
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add('hidden');
    }
    async function changeBackground(city) {
        const body = document.body; 
        const PEXELS_API_KEY = "OWIyHpBhQOHxc3ZW8upmWoQWL5NE5kU6V234GNahZzhpB1dXwObRnSKG";

       const response = await fetch(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, {
           headers: {
              Authorization: PEXELS_API_KEY
           }
        });

       const data = await response.json();
       if (data.photos.length > 0) {
           const imageUrl = data.photos[0].src.landscape;
           body.style.backgroundImage = `url('${imageUrl}')`;
           body.style.backgroundSize = "cover";
           body.style.backgroundRepeat = "no-repeat";
           body.style.backgroundPosition = "center";
        } else {
             body.style.backgroundImage = "linear-gradient(135deg, #fceabb, rgb(233, 178, 27))";
        }
    }


});
