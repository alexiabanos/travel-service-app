function updateEvent(event_id) {
    // Get form fields we need to get data from
    let eventId = document.querySelector(`#editEventModal${event_id} #event_id-update`);
    let inputEventTitle = document.querySelector(`#editEventModal${event_id} #input-event_title-update`);
    let inputEventDate = document.querySelector(`#editEventModal${event_id} #input-event_date-update`);
    let inputEventTime = document.querySelector(`#editEventModal${event_id} #input-event_time-update`);
    let inputEventType = document.querySelector(`#editEventModal${event_id} #input-event_type-update`);

    // Get the values from the form fields
    let eventIdValue = eventId.value;
    let eventTitleValue = inputEventTitle.value;
    let eventDateValue = inputEventDate.value;
    let eventTimeValue = inputEventTime.value;
    let eventTypeValue = inputEventType.value;

    // Put our data we want to send in a javascript object
    let data = {
        event_id: eventIdValue,
        event_title: eventTitleValue,
        eventDate: eventDateValue,
        eventTime: eventTimeValue,
        event_type: eventTypeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, eventTitleValue);
            updateRow(xhttp.response, eventDateValue);
            updateRow(xhttp.response, eventTimeValue);
            updateRow(xhttp.response, eventTypeValue);

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function updateRow(data, event_id) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("events-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log(table.rows[i].getAttribute('data-value'));
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute('data-value') == event_id) {

            // Get the location of the row where we found the matching event ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of event_title value
            td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign event_title to our value we updated to
            td.innerHTML = parsedData[0].event_title;

            // Get td of event_date value
            td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign event_date to our value we updated to
            td.innerHTML = parsedData[0].eventDate;

            // Get td of event_time value
            td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign event_time to our value we updated to
            td.innerHTML = parsedData[0].eventTime;

            // Get td of event_type value
            td = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign event_type to our value we updated to
            td.innerHTML = parsedData[0].event_type;
            window.location.reload();
        }
    }
}