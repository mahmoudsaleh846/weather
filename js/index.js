const apiKey = "1155e4fdf9344ca791253527240601";         

const searchBox = document.querySelector(".find-location .search")
const searchBtn = document.querySelector(".find-location .input-btn")
async function checkWeather(cityName){
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`;
    const response = await fetch(apiUrl);
    var data = await response.json();

    var localTime = data.location.localtime;
    var dateObject = new Date(localTime);
    var dayOfWeek = dateObject.getDay();
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = weekdays[dayOfWeek];
    var month = dateObject.getMonth();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthName = months[month];
    var dayOfMonth = dateObject.getDate();

    //current day
    document.querySelector(".today .date").innerHTML = dayOfMonth + monthName
    document.querySelector(".today .day").innerHTML = dayName
    document.querySelector(".current .location").innerHTML = data.location.name;
    document.querySelector(".current .num").innerHTML = Math.round(data.current.temp_c)+`<sup>o</sup>`+"C";
    document.querySelector(".current .custom").innerHTML = data.current.condition.text;
    document.querySelector(".current .humidity").innerHTML = `<img src="imgs/icon-umberella.png" alt="" class = "icon">`+ data.current.humidity + "%";
    document.querySelector(".current .wind").innerHTML = `<img src="imgs/icon-wind.png" alt="" class = "icon">`+ Math.round(data.current.wind_kph)+ "km/h";
    document.querySelector(".current .direction").innerHTML = `<img src="imgs/icon-compass.png" alt="" class = "icon">`+ data.current.wind_dir;
    //next day
    nextDay= data.forecast.forecastday[1];
    var localTime = nextDay.date;
    var dateObject = new Date(localTime);
    var dayOfWeek = dateObject.getDay();
    var dayName = weekdays[dayOfWeek];
    document.querySelector(".sec-day .day").innerHTML = dayName;
    document.querySelector(".sec-day .degree").innerHTML = nextDay.day.maxtemp_c;
    //third day 
    thirdDay= data.forecast.forecastday[2];
    var localTime = thirdDay.date;
    var dateObject = new Date(localTime);
    var dayOfWeek = dateObject.getDay();
    var dayName = weekdays[dayOfWeek];
    document.querySelector(".third-day .day").innerHTML = dayName;
    document.querySelector(".third-day .degree").innerHTML = thirdDay.day.maxtemp_c;
}
function showDefaultWeather() {
    checkWeather("Cairo");
}
document.addEventListener('DOMContentLoaded', function () {
    showDefaultWeather();
});
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})

         
