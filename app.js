// Citation for the following file:
// Date: 05/21/2024
// Adapted from nodejs-starter-app on github.com provided to students via Canvas/course materials
// Code was copied and pasted from the code snippets and changed to fit the database needs for project
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 9982;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');        

// Static Files
app.use(express.static('public'));



// display travelers
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Travelers;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('index', {data: rows});                  
        })                                                      
    });                                                         


// insert a traveler
app.post('/add-traveler-form', function(req, res) 
{
    let data = req.body;



    // Create the query and run it on the database
    query1 = `INSERT INTO Travelers(first_name, last_name, email, phone_number) VALUES ('${data['input-first-name']}', '${data['input-last-name']}', '${data['input-email']}', '${data['input-phone-number']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})


// delete traveler
app.delete('/delete-traveler-ajax/', function(req,res,next){
    let data = req.body;
    let traveler_id = parseInt(data.id);
    let deleteTraveler= `DELETE FROM Travelers WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteTraveler, [traveler_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  })});




  // update traveler
  app.put('/put-person-ajax', function(req,res,next){
  let data = req.body;

  let fullname = data.fullname;
  let email = parseInt(data.email);
  let phone_number = parseInt(data.phone_number)

  let queryUpdateTraveler = `UPDATE Travelers SET fullname = ? WHERE Travelers.id = ?`;
  let selectTraveler = `SELECT * FROM Travelers WHERE id = ?`

        // Run the 1st query
        db.pool.query(queryUpdateTraveler, [fullname, email, phone_number], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectTraveler, [fullname], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});





// display travel agents
app.get('/travel_agents', function(req, res)
    {  
        let query1 = "SELECT * FROM Travel_Agents;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('travel_agents', {data: rows});                  
        })                                                      
    });                                                         


// insert a travel agent
app.post('/add-travel-agent-form', function(req, res) 
{
    let data = req.body;



    // Create the query and run it on the database
    query1 = `INSERT INTO Travel_Agents(first_name, last_name, email) VALUES ('${data['input-first-name-agent']}', '${data['input-last-name-agent']}', '${data['input-email-agent']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/travel_agents');
        }
    })
})


// delete traveler
app.delete('/delete-traveler-ajax/', function(req,res,next){
    let data = req.body;
    let traveler_id = parseInt(data.id);
    let deleteTraveler= `DELETE FROM Travelers WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteTraveler, [traveler_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  })});




  // update traveler
  app.put('/put-person-ajax', function(req,res,next){
  let data = req.body;

  let fullname = data.fullname;
  let email = parseInt(data.email);
  let phone_number = parseInt(data.phone_number)

  let queryUpdateTraveler = `UPDATE Travelers SET fullname = ? WHERE Travelers.id = ?`;
  let selectTraveler = `SELECT * FROM Travelers WHERE id = ?`

        // Run the 1st query
        db.pool.query(queryUpdateTraveler, [fullname, email, phone_number], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectTraveler, [fullname], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});

/*
    LISTENER
*/
app.listen(PORT, function(){           
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});