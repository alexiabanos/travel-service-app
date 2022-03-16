function updateFlight(flight_id) {
    // Get form fields we need to get data from
    let flightId = document.querySelector(`#editFlightModal${flight_id} #flight_id-update`);
    let inputDepartAirp = document.querySelector(`#editFlightModal${flight_id} #input-depart_airp-update`);
    let inputDepartDate = document.querySelector(`#editFlightModal${flight_id} #input-depart_date-update`);
    let inputDepartTime = document.querySelector(`#editFlightModal${flight_id} #input-depart_time-update`);
    let inputArriveAirp = document.querySelector(`#editFlightModal${flight_id} #input-arrive_airp-update`);
    let inputArriveDate = document.querySelector(`#editFlightModal${flight_id} #input-arrive_date-update`);
    let inputArriveTime = document.querySelector(`#editFlightModal${flight_id} #input-arrive_time-update`);

    // Get the values from the form fields
    let flightIdValue = flightId.value;
    let departAirpValue = inputDepartAirp.value;
    let departDateValue = inputDepartDate.value;
    let departTimeValue = inputDepartTime.value;
    let arriveAirpValue = inputArriveAirp.value;
    let arriveDateValue = inputArriveDate.value;
    let arriveTimeValue = inputArriveTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        flight_id: flightIdValue,
        depart_airp: departAirpValue,
        depart_date: departDateValue,
        depart_time: departTimeValue,
        arrive_airp: arriveAirpValue,
        arrive_date: arriveDateValue,
        arrive_time: arriveTimeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-flight-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, departAirpValue);
            updateRow(xhttp.response, departDateValue);
            updateRow(xhttp.response, departTimeValue);
            updateRow(xhttp.response, arriveAirpValue);
            updateRow(xhttp.response, arriveDateValue);
            updateRow(xhttp.response, arriveTimeValue);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function updateRow(data, flight_id) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("flights-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log(table.rows[i].getAttribute('data-value'));
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute('data-value') == flight_id) {

            // Get the location of the row where we found the matching flight ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of depart_airp value
            td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign depart_airp to our value we updated to
            td.innerHTML = parsedData[0].depart_airp;

            // Get td of depart_date value
            td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign depart_date to our value we updated to
            td.innerHTML = parsedData[0].depart_date;

            // Get td of depart_time value
            td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign depart_time to our value we updated to
            td.innerHTML = parsedData[0].depart_time;

            // Get td of arrive_airp value
            td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign arrive_airp to our value we updated to
            td.innerHTML = parsedData[0].arrive_airp;

            // Get td of arrive_date value
            td = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign arrive_date to our value we updated to
            td.innerHTML = parsedData[0].depart_time;

            // Get td of arrive_time value
            td = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign arrive_time to our value we updated to
            td.innerHTML = parsedData[0].arrive_airp;

            window.location.reload();
        }
    }
}