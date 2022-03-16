function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));
    }
    return result;
  }
  const destination = getQueryString()["destination"];

  // IMAGE MICROSERVICE
  var url = "http://flip3.engr.oregonstate.edu:12789/images/"+destination+"traveling/3";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function(data, status) {
    const response = JSON.parse(xhr.response);
    console.log(response);
    if (xhr.status === 200) {
      locationImage.src = response.imagePath0;
      attractionImage.src = response.imagePath1;
      restaurantImage.src = response.imagePath2;
    } else {
      console.log("Image Not Found.")
    }
  }
  xhr.onerror = function(err) { 
    console.log("Network Error", err);
  };
  xhr.send();