const apiKey = "my_api_here";
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=Imperial&q=";

        const search_box = document.querySelector(".search input");
        const search_btn = document.querySelector(".search button");
        const weather_icon = document.querySelector(".weather-icon");

        // const day_forecast = document.querySelector(".days");

        async function _checkWeather(city) {
            const resp = await fetch(apiURL + city + `&appid=${apiKey}`);
            var data = await resp.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " mph";

            if (data.weather[0].main == "Clouds") {
              weather_icon.src = "images/icons-cloud.png";
            } 
            else if (data.weather[0].main == "Rain") {
              weather_icon.src = "images/icons-rain.png"; 
            } 
            else if (data.weather[0].main == "Drizzle") {
              weather_icon.src = "images/icons-drizzle.png"; 
            } 
            else if (data.weather[0].main == "Mist") {
              weather_icon.src = "images/icons-mist.png"; 
            }  
            else if (data.weather[0].main == "Sunny") {
              weather_icon.src = "images/icons-sunny.png"; 
            }
            else if (data.weather[0].main == "Clear") {
              weather_icon.src = "images/icons-sunny.png"; 
            }
        }
        search_btn.addEventListener("click", ()=>{
          _checkWeather(search_box.value);
        })