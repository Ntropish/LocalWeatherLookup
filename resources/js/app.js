/**
 * Created by Justin on 7/11/2015.
 */
$(document).ready(function(){
    if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
        });
    }
    else {
        alert("No soup for you!  Your browser does not support this feature");
    }
});