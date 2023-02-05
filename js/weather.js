const city = document.querySelector("#weather span:first-child");
const weather = document.querySelector("#weather span:last-child");
const API_KEY = "031043ec85dfc5da3d330598a4cf7660";

function geoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = `${data.name} /`;
      weather.innerText = `${data.weather[0].main} /${data.main.temp}`;
    });
}

function geoError() {
  alert("사용자의 위치를 찾을수 없습니다...");
}

navigator.geolocation.getCurrentPosition(geoOk, geoError);
