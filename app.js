// Citation for the following file:
// Date: 05/21/2024
// Adapted from nodejs-starter-app on github.com provided to students via Canvas/course materials
// Code was copied and pasted from the code snippets and changed to fit the database needs for project
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// App.js
var express = require('express');
var app     = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 9987; 

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  
app.set('view engine', '.hbs'); 


var db = require('./database/db-connector')


// display travelers
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Travelers;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('index', {data: rows});                  
        })                                                      
    });                                                         


// add traveler
app.post('/add-traveler-ajax', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO Travelers (first_name, last_name, email, phone_number) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.phone_number}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error
            query2 = `SELECT * FROM Travelers;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



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