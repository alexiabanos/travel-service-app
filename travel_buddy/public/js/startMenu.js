// Parse query parameters
function getQueryString() {
  var result = {}, queryString = location.search.slice(1),
      re = /([^&=]+)=([^&]*)/g, m;
  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));
  } return result;
}
var destination = getQueryString()["destination"];

// Set default sentence if destination is undefined
if (typeof destination === "undefined" || null) {
  document.getElementById("destinationName").innerHTML = "a new place";
  var destination = "travel";
} else{
  document.getElementById("destinationName").innerHTML = destination; 
  // Get destination name from parameters
  var destination = getQueryString()["destination"];
};

// Image Microservice URL
var imagesURL = `http://flip3.engr.oregonstate.edu:12789/images/${destination}/6`;

// HTTP Request
const xhr = new XMLHttpRequest();
xhr.open("GET", imagesURL);
xhr.onload = function(data, status) {
  const response = JSON.parse(xhr.response);
  console.log(response);
  if (xhr.status === 200) {
    // Set image paths
    activityImage.src = response.imagePath0;
    restaurantImage.src = response.imagePath1;
    reservationImage.src = response.imagePath2;
  } else {
    console.log("Image Not Found.")
  }
}
xhr.onerror = function(err) { 
  console.log("Network Error", err);
};
xhr.send();