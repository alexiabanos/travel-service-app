function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, ' '));
    }

    return result;
  }
function destination(){
  const destination = getQueryString()["destination"];
  return destination;
}
  
function API_KEY(){
  const API_KEY = process.env.API_KEY;
  return API_KEY;
}
  
