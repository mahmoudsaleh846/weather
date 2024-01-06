document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.input-btn').addEventListener('click', function() {
        // Get the city name from the input field
        var cityName = document.querySelector('.search').value;

        // Make sure the city name is not empty
        if (cityName.trim() !== "") {
            // Use your WeatherAPI.com API key
            var apiKey = "1155e4fdf9344ca791253527240601";

            // Construct the API URL
            var apiUrl = "http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=" + cityName + "&days=3";

            // Make the API request using the fetch API
            fetch(apiUrl)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch weather information. Please check the city name and try again.');
                    }
                })
                .then(data => {
                    // Update the weather information on the page
                    document.querySelector('.location').textContent = data.location.name;
                    document.querySelector('.num').innerHTML = data.current.temp_c + "<sup>o</sup>C";
                    document.querySelector('.custom').textContent = data.current.condition.text;

                    // Update rain percentage, wind speed, and wind direction
                    var spans = document.querySelectorAll('.forecast-content span');
                    spans[0].innerHTML = `<img src='imgs/icon-umberella.png' alt=''>${data.current.humidity}%`;
                    spans[1].innerHTML = `<img src='imgs/icon-wind.png' alt=''>${data.current.wind_kph}km/h`;
                    spans[2].innerHTML = `<img src='imgs/icon-compass.png' alt=''>${data.current.wind_dir}`;

                    // Update date and day for today
                    var currentDate = new Date(data.location.localtime);
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    var formattedDate = currentDate.toLocaleDateString('en-US', options);
                    document.querySelector('.day').textContent = formattedDate.split(',')[0];
                    document.querySelector('.date').textContent = formattedDate.split(',')[1].trim();

                    // Update forecast for the next two days
                    for (var i = 1; i <= 2; i++) {
                        var forecastDay = data.forecast.forecastday[i];
                        var forecastElement = document.querySelector(`.forecast:nth-child(${i + 1})`);
                        forecastElement.querySelector('.day').textContent = forecastDay.date;
                        forecastElement.querySelector('.forecast-icon img').src = forecastDay.day.condition.icon;
                        forecastElement.querySelector('.degree').innerHTML = `${forecastDay.day.avgtemp_c}<sup>o</sup>C`;
                        forecastElement.querySelector('.custom').textContent = forecastDay.day.condition.text;
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather information:', error.message);
                    alert(error.message);
                });
        } else {
            alert("Please enter a city name.");
        }
    });
});