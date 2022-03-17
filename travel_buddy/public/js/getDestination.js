// Parse query parameters
function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));
    }
    return result;
  }

// Get destination name from parameters
let destination = getQueryString()["destination"];

// Add destination name to page title
document.getElementById("destinationName").innerHTML = destination;

// Set Map URLs
restaurantURL = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=restaurants+in+${destination}+/;`
activitiesURL = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=attractions+in+${destination}+/;`

document.getElementById('restaurantMap').src = restaurantURL;
document.getElementById('activitiesMap').src = activitiesURL;

