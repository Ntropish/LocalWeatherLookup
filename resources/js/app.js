/**
 * Created by Justin on 7/11/2015.
 */
$(document).ready(function(){
    var toCelsius = false;
    var temp = 0;
    var images = {
        sky: {
            clear:'resources/img/clear.jpg',
            cloud:'resources/img/cloud.jpg',
            overcast:'resources/img/overcast.jpg',
            rain:'resources/img/rain.png',
            storm:'resources/img/storm.jpg'
        },
        ground: {
            cold:'resources/img/cold.jpg',
            avg:'resources/img/avg.jpg',
            hot:'resources/img/hot.jpg'
        }
    };
    function display(data) {
        var groundImg = images.ground.avg;
        var skyImg    = images.sky.clear;
        if (data.weather[0].main === 'Clouds') {
            if (data.weather[0].description === 'scattered clouds') {
                skyImg = images.sky.cloud;
            } else {
                skyImg = images.sky.overcast;
            }
        } else if (data.weather[0].main === 'Rain') {
            skyImg = images.sky.rain;
        }
        if (data.main.temp > 80) {
            groundImg = images.ground.hot;
        } else if (data.main.temp < 0) {
            groundImg = images.ground.cold;
        }
        $('#sky').append($('<img src="'+skyImg+'">'));
        $('#ground').append($('<img src="'+groundImg+'">'));
        $('#location').text(data.name);
        temp = data.main.temp;
        displayTemp();
        $('#weather').text(data.weather[0].description).append($('<img id="icon" src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png">'));
    }
    function displayTemp(){
        $('#temp').text(Math.round((toCelsius?32:0) + (temp / (toCelsius?2.12:1))*10)/10 +' '+ (toCelsius?'C':'F'));
    }
    $('#unit-button').on('click', function(){
        toCelsius = !toCelsius;
        displayTemp();
    });

    if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            var units = 'imperial';
            var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=' + units;
            $.get(url, display);
        });
    }
    else {
        alert("No soup for you!  Your browser does not support this feature");
    }
});