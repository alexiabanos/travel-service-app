// Get the objects we need to modify
let addEventForm = document.getElementById('add-event-form-ajax');

// Modify the objects we need
addEventForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEventTitle = document.getElementById("input-event_title");
    let inputEventDate = document.getElementById("input-event_date");
    let inputEventTime = document.getElementById("input-event_time");
    let inputEventType = document.getElementById("input-event_type");

    // Get the values from the form fields
    let eventTitleValue = inputEventTitle.value;
    let eventDateValue = inputEventDate.value;
    let eventTimeValue = inputEventTime.value;
    let eventTypeValue = inputEventType.value;

    // Put our data we want to send in a javascript object
    let data = {
        event_title: eventTitleValue,
        event_date: eventDateValue,
        event_time: eventTimeValue,
        event_type: eventTypeValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEventTitle.value = '';
            inputEventDate.value = '';
            inputEventTime.value = '';
            inputEventType.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    window.location.reload();

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("events-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (Price object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let eventTitleCell = document.createElement("TD");
    let eventDateCell = document.createElement("TD");
    let eventTimeCell = document.createElement("TD");
    let eventTypeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.event_id;
    eventTitleCell.innerText = newRow.event_title;
    eventDateCell.innerText = newRow.event_date;
    eventTimeCell.innerText = newRow.event_time;
    eventTypeCell.innerText = newRow.event_type;


    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteEvent(newRow.event_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(eventTitleCell);
    row.appendChild(eventDateCell);
    row.appendChild(eventTimeCell);
    row.appendChild(eventTypeCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.event_id);

    // Add the row to the table
    currentTable.appendChild(row);
    window.location.reload();

}