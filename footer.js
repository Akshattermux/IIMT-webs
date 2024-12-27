function updateDateTime() {
    const now = new Date();

    // Get day of the week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];

    // Get date in a formatted style (e.g., 22 December 2024)
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = now.toLocaleDateString('en-GB', options);

    // Get time in a formatted style (e.g., 10:30:15 PM)
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Update the HTML elements
    document.getElementById('day').textContent = day;
    document.getElementById('date').textContent = date;
    document.getElementById('time').textContent = time;
  }

  // Call the updateDateTime function every second
  setInterval(updateDateTime, 1000);

  // Initial call to display the date and time immediately
  updateDateTime();

  const apiKey = "1ef9a0cef24a8dab9b5222439721fc5b";
    const city = "Saharanpur"; // Change to your city
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const pollutionApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=28.6139&lon=77.2090&appid=${apiKey}`;

    // Fetch weather data
    async function fetchWeatherData() {
      try {
        // Fetch weather information
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        // Fetch air pollution data
        const pollutionResponse = await fetch(pollutionApiUrl);
        const pollutionData = await pollutionResponse.json();

        // Extract relevant data
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const airQualityIndex = pollutionData.list[0].main.aqi;

        // Weather condition and icon
        const weatherCondition = weatherData.weather[0].main; // e.g., Sunny, Cloudy
        const weatherDescription = weatherData.weather[0].description; // Detailed description
        const iconCode = weatherData.weather[0].icon; // Icon code from API
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // URL for the weather icon

        // Update HTML elements
        document.getElementById("location").textContent = `Weather in ${city}`;
        document.getElementById("description").textContent = `Condition: ${weatherCondition} (${weatherDescription})`;
        document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${windSpeed} m/s`;
        document.getElementById("pollution").textContent = `Air Quality Index (AQI): ${airQualityIndex}`;
        document.getElementById("weather-icon").src = iconUrl; // Set the weather icon
        document.getElementById("weather-icon").alt = weatherCondition; // Set alt text for the icon
      } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("location").textContent = "Unable to fetch weather data.";
      }
    }

    // Call the function on page load
    fetchWeatherData();