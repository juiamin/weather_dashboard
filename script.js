var findMe = $("#search-input");
var status = $("#search-results");
var API_KEY = "6c5a83c39d9d9c705a7b2181dc3c4962";
var searchForm = $("#search-form");
var cityArr = [];


searchForm.on("submit", function (event) {
  event.preventDefault()
  var city = $("#search-input").val()
  console.log("Search for city! " + city)
  //for current weather
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_KEY;
  console.log(queryUrl)

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function (weatherRes) {
      console.log(weatherRes);
      var coordinates = weatherRes.coord
      console.log(coordinates)
     /*  $("#search-form").text(JSON.strongify(weatherRes)) */;
      $(".City").text(weatherRes.name);
      $(".Temperature").text(weatherRes.main.temp);
      $(".Humidity").text(weatherRes.main.humidity);
      $(".Wind-Speed").text(weatherRes.wind.speed);

      cityArr.push(city);
      /*  weatherSearch (city,country) */

      $('#user-input').empty();

      cityArr.forEach(function (city) {
        $("<button>")
          .addClass('btn btn-outline-success city-btn')
          .text(city)
          .attr("weather-data", city)
          .appendTo("#user-input");
      });
      getUvIndex(coordinates)
    });
  
    
})


function getUvIndex(coordinateObject) {
  var queryUrl ="http://api.openweathermap.org/data/2.5/uvi?lat=" + coordinateObject.lat + "&lon=" + coordinateObject.lon + "&appid=" + API_KEY;
  console.log(queryUrl)
  $.ajax({
    url: queryUrl,
    method: "GET"
  }) 
  .then(function (uvRes) {
    console.log(uvRes);
    $(".uv_index").text(uvRes.value);
  });
}
//for uv index



findMe.onclick = function () {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    console.log(latitude, longitude)
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

