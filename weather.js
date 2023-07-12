const time_element = document.getElementById('time');
const date_element = document.getElementById('date');
const currentweather_element = document.getElementById('current-weather-items');

const timezone = document.getElementById('time-zone');
const country_element = document.getElementById('country');

const weatherforecast_element = document.getElementById('wather-forecast');
const currenttemp_element = document.getElementById('current_temp');

const humidity_item = document.getElementById('humidity');
const pressure_item = document.getElementById('pressure');
const wind_speed_item = document.getElementById('wind_speed');
const sunrise_item = document.getElementById('sunrise');
const sunset_item = document.getElementById('sunset');

const d_name = document.getElementById('day_name');
const t_day = document.getElementById('temp_day');
const t_night = document.getElementById('temp_night'); 


const api_key = "1bca2ee8d893bd3f07c21a737df3a1a2";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


function timeItems() {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursin12hrforescast = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM':'AM'

  time_element.innerHTML = (hoursin12hrforescast < 10? '0' + hoursin12hrforescast: hoursin12hrforescast)+':'+ (minutes < 10? '0' + minutes: minutes) +' '+ `<span id="am_pm">${ampm}</span>`
  date_element.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}

setInterval(timeItems(), 1000);



const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback);

function getWeathInfo() {
  navigator.geolocation.getCurrentPosition((success)=>{
    console.log(success);
    let {latitude, longitude} = success.coords;
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${api_key}`).then(res => res.json()).then(data => {
      console.log(data)
      showweatherInfo(data);
      // showDailyWeatherInfo(data);
    })
  })
}

function showweatherInfo(data) {
  
  let {humidity, pressure, wind_speed, sunrise, sunset} = data.current

  // humidity_item.innerHTML = humidity
  // pressure_item.innerHTML = pressure
  // wind_speed_item.innerHTML = wind_speed

  // sunrise_item.innerHTML = sunrise
  // sunset_item.innerHTML = sunset

  timezone.innerHTML = data.timezone;
  country_element.innerHTML = data.lat + 'N ' + data.lon + 'E'

  currentweather_element.innerHTML = `<div class="weather-item">
    <p>Humidity</p>
    <p id="humidity">${humidity}</p>
  </div>
  <div class="weather-item">
    <div>Pressure</div>
    <div id="pressure">${pressure}</div>
  </div>
  <div class="weather-item">
    <div>Wind Speed</div>
    <div id="wind_speed">${wind_speed}</div>
  </div>
  <div class="weather-item">
    <div>Sun Rise</div>
    <div id="sunrise">${window.moment(sunrise*1000).format('HH:mm a')}</div>
  </div>
  <div class="weather-item">
    <div>Sun Set</div>
    <div id="sunset">${window.moment(sunset*1000).format('HH:mm a')}</div>
  </div>`;

  let other_daycast = ''
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currenttemp_element.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon">
      <div class="day" id="day_name">${window.moment(day.dt*1000).format('ddd')}</div>
      <div class="temp-night" id="temp_night">Night - ${day.temp.night}&deg;F</div>
      <div class="temp-day" id="temp_day">Day - ${day.temp.day}&deg;F</div>
      
      `
    } else {
      other_daycast += `
        <div class="weather-forecast-item">
          <div class="day" id="day_name">${window.moment(day.dt*1000).format('ddd')}</div>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
          <div class="temp-night" id="temp_night">Night - ${day.temp.night}&deg;F</div>
          <div class="temp-day" id="temp_day">Day - ${day.temp.day}&deg;F</div>
        </div>
        
        `
    }
  })
  weatherforecast_element.innerHTML = other_daycast;
}

// function showDailyWeatherInfo(data) {
//   let {day, night, eve} = data.daily;

//   data.daily.forEach((element) => {
//     t_day.innerHTML = element.temp.day;
//     t_night.innerHTML = element.temp.night;
//   });
// }

// function updateInfo(temp, time, condition, locationName) {
//   let splitDate = time.split(" ")[0];
//   let splitTime = time.split(" ")[1];

//   let currentDay = getDayName(new Date(splitDate).getDay());

// }

// function getDayName(number) {
//   switch(number) {
//     case 0:
//       return 'Sunday';
//     case 1:
//       return 'Monday';
//     case 2:
//       return 'Tuesday';
//     case 3:
//       return 'Wednesday';
//     case 4:
//       return 'Thursday';
//     case 5:
//       return 'Friday';
//     case 6:
//       return 'Saturday';
//   }
// }



getWeathInfo();