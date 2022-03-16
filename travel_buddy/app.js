/*
    SETUP
*/
const axios = require('axios')

// Express
const express = require('express');
const app = express();
PORT = 4922;

// Database
var db = require('./database/db-connector')

require('dotenv').config()
const API_KEY = process.env.API_KEY;

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); 
const { NULL } = require('mysql/lib/protocol/constants/types');

app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: ".hbs"
})); 

app.set('view engine', '.hbs');

// Add-Update-Delete Setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

/*
    GET Requests
*/

app.get('/', (req, res) => {
    res.render('index', { layout: 'main2' })
});

app.get('/addEvents', (req, res) => {
    // Define our query
    let query1 = "SELECT event_id, event_title, DATE_FORMAT(event_date, '%M %d, %Y') AS eventDate, DATE_FORMAT(event_time, '%l:%i %p') as eventTime, event_type FROM addEvents;";

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

        return res.render('addEvents', { data: rows, layout: 'main2' });
    })
});

app.get('/addFlights', (req, res) => {
    let query1 = "SELECT flight_id, depart_airp, DATE_FORMAT(depart_date, '%M %d, %Y') AS departDate, DATE_FORMAT(depart_time, '%l:%i %p') as departTime, arrive_airp, DATE_FORMAT(arrive_date, '%M %d, %Y') AS arriveDate, DATE_FORMAT(arrive_time, '%l:%i %p') as arriveTime FROM addFlights;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

        return res.render('addFlights', { data: rows, layout: 'main2' });
    })
});

app.get('/addHotels', (req, res) => {
    let query1 = "SELECT hotel_id, hotel_name, hotel_address, DATE_FORMAT(in_date, '%M %d, %Y') AS inDate, DATE_FORMAT(in_time, '%l:%i %p') as inTime,  DATE_FORMAT(out_date, '%M %d, %Y') AS outDate, DATE_FORMAT(out_time, '%l:%i %p') as outTime FROM addHotels;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

        return res.render('addHotels', { data: rows, layout: 'main2' });
    })
});

app.get('/addMenu', (req, res) => {
    res.render('addMenu')
});

app.get('/findActivities', (req, res) => {
    res.render('findActivities')
});

app.get('/findRestaurants', (req, res) => {
    res.render('findRestaurants')
});

app.get('/myItinerary', (req, res) => {
    let query1 = "SELECT flight_id, depart_airp, DATE_FORMAT(depart_date, '%M %d, %Y') AS departDate, DATE_FORMAT(depart_time, '%l:%i %p') as departTime, arrive_airp, DATE_FORMAT(arrive_date, '%M %d, %Y') AS arriveDate, DATE_FORMAT(arrive_time, '%l:%i %p') as arriveTime FROM addFlights;"; // Define our query
    let query2 = "SELECT event_id, event_title, DATE_FORMAT(event_date, '%M %d, %Y') AS eventDate, DATE_FORMAT(event_time, '%l:%i %p') as eventTime, event_type FROM addEvents;";
    let query3 = "SELECT hotel_id, hotel_name, hotel_address, DATE_FORMAT(in_date, '%M %d, %Y') AS inDate, DATE_FORMAT(in_time, '%l:%i %p') as inTime,  DATE_FORMAT(out_date, '%M %d, %Y') AS outDate, DATE_FORMAT(out_time, '%l:%i %p') as outTime FROM addHotels;";

    db.pool.query(query1, function(error, rows1, fields) { // Execute the query

        db.pool.query(query2, function(error, rows2, fields) { // Execute the query

            db.pool.query(query3, function(error, rows3, fields) { // Execute the query

                res.render('myItinerary', { data1: rows1, data2: rows2, data3: rows3 });
            });
        });
    });
});

app.get('/startMenu', (req, res) => {
    res.render('startMenu')
});


/*
    POST Requests
*/

// Add Event

app.post('/add-event-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO addEvents (event_title, event_date, event_time, event_type) VALUES ('${data.event_title}', '${data.event_date}', '${data.event_time}', '${data.event_type}');`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong 
            console.log(error)
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM addEvents;`;
            db.pool.query(query2, function(error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add Hotel

app.post('/add-hotel-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO addHotels (hotel_name, hotel_address, in_date, in_time, out_date, out_time) VALUES ('${data.hotel_name}', '${data.hotel_address}', '${data.in_date}', '${data.in_time}', '${data.out_date}', '${data.out_time}');`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong
            console.log(error)
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM addHotels;`;
            db.pool.query(query2, function(error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add Flight

app.post('/add-flight-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO addFlights (depart_airp, depart_date, depart_time, arrive_airp, arrive_date, arrive_time) VALUES ('${data.depart_airp}', '${data.depart_date}', '${data.depart_time}', '${data.arrive_airp}', '${data.arrive_date}', '${data.arrive_time}');`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong
            console.log(error)
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM addFlights;`;
            db.pool.query(query2, function(error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    DELETE
*/

// Delete Event

app.delete('/delete-event-ajax/', function(req, res, next) {
    let data = req.body;
    let event_id = parseInt(data.event_id);
    let deleteEvent = `DELETE FROM addEvents WHERE event_id = ?;`;

    // Run the 1st query
    db.pool.query(deleteEvent, [event_id], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong
            console.log(error);
            res.sendStatus(400);
        }
    })
});

// Delete Flight

app.delete('/delete-flight-ajax/', function(req, res, next) {
    let data = req.body;
    let flight_id = parseInt(data.flight_id);
    let deleteFlight = `DELETE FROM addFlights WHERE flight_id = ?;`;

    // Run the 1st query
    db.pool.query(deleteFlight, [flight_id], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong
            console.log(error);
            res.sendStatus(400);
        }
    })
});

// Delete Hotel

app.delete('/delete-hotel-ajax/', function(req, res, next) {
    let data = req.body;
    let hotel_id = parseInt(data.hotel_id);
    let deleteHotel = `DELETE FROM addHotels WHERE hotel_id = ?;`;

    // Run the 1st query
    db.pool.query(deleteHotel, [hotel_id], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong
            console.log(error);
            res.sendStatus(400);
        }
    })
});

/*
    PUT Requests
*/

// Edit Events
app.put('/put-event-ajax', function(req, res, next) {
    let data = req.body;
    let event_id = parseInt(data.event_id);
    let event_title = (data.event_title);
    let event_date = (data.eventDate);
    let event_time = (data.eventTime);
    let event_type = (data.event_type);

    let queryUpdateEvent = `UPDATE addEvents SET event_title = ?, event_date = ?, event_time = ?, event_type = ? WHERE addEvents.event_id = ?;`;
    let selectEvent = `SELECT * FROM addEvents WHERE event_id = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateEvent, [event_title, event_date, event_time, event_type, event_id], function(error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data 
        else {
            // Run the second query
            db.pool.query(selectEvent, [event_id], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-flight-ajax', function(req, res, next) {
    let data = req.body;
    let flight_id = parseInt(data.flight_id);
    let depart_airp = (data.depart_airp);
    let depart_date = (data.departDate);
    let depart_time = (data.departTime);
    let arrive_airp = (data.arrive_airp);
    let arrive_date = (data.arriveDate);
    let arrive_time = (data.arriveTime);

    let queryUpdateFlight = `UPDATE addFlights SET depart_airp = ?, depart_date = ?, depart_time = ?, arrive_airp = ?, arrive_date = ?, arrive_time = ? WHERE addFlights.flight_id = ?;`;
    let selectFlight = `SELECT * FROM addFlights WHERE flight_id = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateFlight, [depart_airp, depart_date, depart_time, arrive_airp, arrive_date, arrive_time, flight_id], function(error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data 
        else {
            // Run the second query
            db.pool.query(selectFlight, [flight_id], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-hotel-ajax', function(req, res, next) {
    let data = req.body;
    let hotel_id = parseInt(data.hotel_id);
    let hotel_name = (data.hotel_name);
    let hotel_address = (data.hotel_address);
    let in_date = (data.inDate);
    let in_time = (data.inTime);
    let out_date = (data.outDate);
    let out_time = (data.outTime);

    let queryUpdateHotel = `UPDATE addHotels SET hotel_name = ?, hotel_address = ?, in_date = ?, in_time = ?, out_date = ?, out_time = ? WHERE addHotels.hotel_id = ?;`;
    let selectHotel = `SELECT * FROM addHotels WHERE hotel_id = ?;`;

    // Run the 1st query
    db.pool.query(queryUpdateHotel, [hotel_name, hotel_address, in_date, in_time, out_date, out_time, hotel_id], function(error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data
        else {
            // Run the second query
            db.pool.query(selectHotel, [hotel_id], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

module.exports = app;