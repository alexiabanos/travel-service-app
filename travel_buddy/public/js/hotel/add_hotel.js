// Get the objects we need to modify
let addHotelForm = document.getElementById('add-hotel-form-ajax');

// Modify the objects we need
addHotelForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputHotelName = document.getElementById("input-hotel_name");
    let inputHotelAddress = document.getElementById("input-hotel_address");
    let inputInDate = document.getElementById("input-in_date");
    let inputInTime = document.getElementById("input-in_time");
    let inputOutDate = document.getElementById("input-out_date");
    let inputOutTime = document.getElementById("input-out_time");

    // Get the values from the form fields
    let hotelNameValue = inputHotelName.value;
    let hotelAddressValue = inputHotelAddress.value;
    let inDateValue = inputInDate.value;
    let inTimeValue = inputInTime.value;
    let outDateValue = inputOutDate.value;
    let outTimeValue = inputOutTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        hotel_name: hotelNameValue,
        hotel_address: hotelAddressValue,
        in_date: inDateValue,
        in_time: inTimeValue,
        out_date: outDateValue,
        out_time: outTimeValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-hotel-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputHotelName.value = '';
            inputHotelAddress.value = '';
            inputInDate.value = '';
            inputInTime.value = '';
            inputOutDate.value = '';
            inputOutTime.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("hotels-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (Price object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let hotelNameCell = document.createElement("TD");
    let hotelAddressCell = document.createElement("TD");
    let inDateCell = document.createElement("TD");
    let inTimeCell = document.createElement("TD");
    let outDateCell = document.createElement("TD");
    let outTimeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.hotel_id;
    hotelNameCell.innerText = newRow.hotel_name;
    hotelAddressCell.innerText = newRow.hotel_address;
    inDateCell.innerText = newRow.in_date;
    inTimeCell.innerText = newRow.in_time;
    outDateCell.innerText = newRow.out_date;
    outTimeCell.innerText = newRow.out_time;


    deleteCell = document.createElement("button");
    deleteCell.className = "btn btn-outline-danger my-2 my-sm-0";
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteHotel(newRow.hotel_id);
        window.location.reload();
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(hotelNameCell);
    row.appendChild(hotelAddressCell);
    row.appendChild(inDateCell);
    row.appendChild(inTimeCell);
    row.appendChild(outDateCell);
    row.appendChild(outTimeCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.hotel_id);

    // Add the row to the table
    currentTable.appendChild(row);
    window.location.reload();

}