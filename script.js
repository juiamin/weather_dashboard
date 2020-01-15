var findMe = $("#search-input");
var status = $("#search-results");
var API_KEY = "675f38ddab3b5842e555b4006a7973c1";
var searchForm = $("#search-form");
var cityArr = [];


searchForm.on("submit", function (event) {
  event.preventDefault()
  var city = $("#search-input").val()
  console.log("Search for city! " + city)

  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_KEY;
  console.log(queryUrl)

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function (weatherRes) {
      console.log(weatherRes);
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
    });


})


