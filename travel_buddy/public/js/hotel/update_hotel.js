function updateHotel(hotel_id) {
    // Get form fields we need to get data from
    let hotelId = document.querySelector(`#editHotelModal${hotel_id} #hotel_id-update`);
    let inputHotelName = document.querySelector(`#editHotelModal${hotel_id} #input-hotel_name-update`);
    let inputHotelAddress = document.querySelector(`#editHotelModal${hotel_id} #input-hotel_address-update`);
    let inputInDate = document.querySelector(`#editHotelModal${hotel_id} #input-in_date-update`);
    let inputInTime = document.querySelector(`#editHotelModal${hotel_id} #input-in_time-update`);
    let inputOutTime = document.querySelector(`#editHotelModal${hotel_id} #input-out_date-update`);
    let inputOutDate = document.querySelector(`#editHotelModal${hotel_id} #input-out_time-update`);

    // Get the values from the form fields
    let hotelIdValue = hotelId.value;
    let hotelNameValue = inputHotelName.value;
    let hotelAddressValue = inputHotelAddress.value;
    let inDateValue = inputInDate.value;
    let inTimeValue = inputInTime.value;
    let outDateValue = inputOutDate.value;
    let outTimeValue = inputOutTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        hotel_id: hotelIdValue,
        hotel_name: hotelNameValue,
        hotel_address: hotelAddressValue,
        in_date: inDateValue,
        in_time: inTimeValue,
        out_date: outDateValue,
        out_time: outTimeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-hotel-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, hotelNameValue);
            updateRow(xhttp.response, hotelAddressValue);
            updateRow(xhttp.response, inDateValue);
            updateRow(xhttp.response, inTimeValue);
            updateRow(xhttp.response, outDateValue);
            updateRow(xhttp.response, outTimeValue);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function updateRow(data, hotel_id) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("hotels-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log(table.rows[i].getAttribute('data-value'));
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute('data-value') == hotel_id) {

            // Get the location of the row where we found the matching hotel ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of hotel_name value
            td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign hotel_name to our value we updated to
            td.innerHTML = parsedData[0].hotel_name;

            // Get td of hotel_address value
            td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign hotel_address to our value we updated to
            td.innerHTML = parsedData[0].hotel_address;

            // Get td of in_date value
            td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign in_date to our value we updated to
            td.innerHTML = parsedData[0].in_date;

            // Get td of hotel_type value
            td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign hotel_type to our value we updated to
            td.innerHTML = parsedData[0].in_time;

            // Get td of out_date value
            td = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign out_date to our value we updated to
            td.innerHTML = parsedData[0].in_date;

            // Get td of out_time value
            td = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign out_time to our value we updated to
            td.innerHTML = parsedData[0].in_time;

            window.location.reload();
        }
    }
}