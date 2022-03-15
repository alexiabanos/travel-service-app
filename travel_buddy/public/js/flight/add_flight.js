// Get the objects we need to modify
let addFlightForm = document.getElementById('add-flight-form-ajax');

// Modify the objects we need
addFlightForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDepartAirp = document.getElementById("input-depart_airp");
    let inputDepartDate = document.getElementById("input-depart_date");
    let inputDepartTime = document.getElementById("input-depart_time");
    let inputArriveAirp = document.getElementById("input-arrive_airp");
    let inputArriveDate = document.getElementById("input-arrive_date");
    let inputArriveTime = document.getElementById("input-arrive_time");

    // Get the values from the form fields
    let departAirpValue = inputDepartAirp.value;
    let departDateValue = inputDepartDate.value;
    let departTimeValue = inputDepartTime.value;
    let arriveAirpValue = inputArriveAirp.value;
    let arriveDateValue = inputArriveDate.value;
    let arriveTimeValue = inputArriveTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        depart_airp: departAirpValue,
        depart_date: departDateValue,
        depart_time: departTimeValue,
        arrive_airp: arriveAirpValue,
        arrive_date: arriveDateValue,
        arrive_time: arriveTimeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-flight-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDepartAirp.value = '';
            inputDepartDate.value = '';
            inputDepartTime.value = '';
            inputArriveAirp.value = '';
            inputArriveDate.value = '';
            inputArriveTime.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("flights-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (Price object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let departAirpCell = document.createElement("TD");
    let departDateCell = document.createElement("TD");
    let departTimeCell = document.createElement("TD");
    let arriveAirpCell = document.createElement("TD");
    let arriveDateCell = document.createElement("TD");
    let arriveTimeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.flight_id;
    departAirpCell.innerText = newRow.depart_airp;
    departDateCell.innerText = newRow.depart_date;
    departTimeCell.innerText = newRow.depart_time;
    arriveAirpCell.innerText = newRow.arrive_airp;
    arriveDateCell.innerText = newRow.arrive_date;
    arriveTimeCell.innerText = newRow.arrive_time;


    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteHotel(newRow.flight_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(departAirpCell);
    row.appendChild(departDateCell);
    row.appendChild(departTimeCell);
    row.appendChild(arriveAirpCell);
    row.appendChild(arriveDateCell);
    row.appendChild(arriveTimeCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.flight_id);

    // Add the row to the table
    currentTable.appendChild(row);
    window.location.reload();

}