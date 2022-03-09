/*
    SETUP
*/

// Express
const express = require('express');
const app = express();
PORT = 4922;

// Database
var db = require('./database/db-connector')

require('dotenv').config()
const API_KEY = process.env.API_KEY;
console.log(API_KEY)

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: ".hbs"
})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.get('/', (req, res) => {
    res.render('index', {layout: 'main2'})
});

app.get('/addEvents', (req, res) => {
    let query1 = "SELECT * FROM addEvents;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

        res.render('addEvents', { data: rows, layout: 'main2'});
    })
});

app.get('/addFlights', (req, res) => {
    let query1 = "SELECT * FROM addFlights;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

        res.render('addFlights', { data: rows, layout: 'main2'});
    })
});

app.get('/addHotels', (req, res) => {
    let query1 = "SELECT * FROM addHotels;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

        res.render('addHotels', { data: rows, layout: 'main2'});
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
    let query1 = "SELECT * FROM addFlights;"; // Define our query
    let query2 = "SELECT * FROM addEvents;";
    let query3 = "SELECT * FROM addHotels;";

    db.pool.query(query1, function(error, rows1, fields) { // Execute the query
        
        db.pool.query(query2, function(error, rows2, fields) { // Execute the query
            
            db.pool.query(query3, function(error, rows3, fields) { // Execute the query
                
                res.render('myItinerary', {data1: rows1, data2: rows2, data3: rows3});
            });
        });
    });
});

app.get('/startMenu', (req, res) => {
    res.render('startMenu')
});

/*
    LISTENER
*/

app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

module.exports = app;