function deleteHotel(hotel_id) {
    // Put our data we want to send in a javascript object
    let data = {
        hotel_id: hotel_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-hotel-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {

                // Add the new data to the table
                deleteRow(hotel_id);
                window.location.reload();

            } else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(hotel_id) {

    let table = document.getElementById("hotels-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == hotel_id) {
            table.deleteRow(i);
            break;
        }
    }
}