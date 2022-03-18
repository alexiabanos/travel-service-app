

// Parse query parameters
function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));
    }
    return result;
  }

// Set default sentence if destination is undefined
if (typeof destination === "undefined" || null){

  // Alert user to enter destination
  let destinationInput = prompt("To find restaurants, please enter a destination:", "New York, NY");
  if (destinationInput == null || destinationInput == "") {
    var destination = "New York, NY";
    var defaultText = "a destination of your choosing";
    document.getElementById("destinationName").innerHTML = defaultText; 
  } else {
    var destination = destinationInput;
    document.getElementById("destinationName").innerHTML = destination; 
  }
} else{
  // Add destination name to page title
  document.getElementById("destinationName").innerHTML = destination; 
  // Get destination name from parameters
  var destination = getQueryString()["destination"];
};

// Set Map URL
restaurantURL = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=restaurants+in+${destination}+/;`
document.getElementById('restaurantMap').src = restaurantURL;


