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

PORT = 9989; //change back to 9989

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');        

// Static Files
app.use(express.static('public'));


// display home page
app.get('/', function(req, res)
    {   

            res.render('index');                  
        })   ;                                                                                                          



// display travelers
app.get('/travelers', function(req, res)
    {  
        let query1 = "SELECT * FROM Travelers;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('travelers', {data: rows});                  
        })                                                      
    });                                                         


// insert a traveler
app.post('/add-traveler-form', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO Travelers(first_name, last_name, email, phone_number) VALUES ('${data['input-first-name']}', '${data['input-last-name']}', '${data['input-email']}', '${data['input-phone-number']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/travelers');
        }
    })
})



// delete a traveler
app.post('/delete-traveler/', function(req, res) 
{
    let traveler_id = req.body.traveler_id;

    query1 = `DELETE FROM Travelers WHERE traveler_id = ?`;
    db.pool.query(query1, [traveler_id], function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/travelers');
        }
    })
})



// update a traveler
app.post('/update-traveler-form', function(req, res) 
{
    let data = req.body;

    query1 = `UPDATE Travelers SET first_name = '${data['update-traveler-first-name']}', last_name = '${data['update-traveler-last-name']}', email = '${data['update-traveler-email']}', phone_number = '${data['update-traveler-phone-number']}' WHERE traveler_id = '${data['update-traveler-id']}'`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {

            res.redirect('/travelers');

                }

    })
});









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

    query1 = `INSERT INTO Travel_Agents(first_name, last_name, email) VALUES ('${data['input-first-name-agent']}', '${data['input-last-name-agent']}', '${data['input-email-agent']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/travel_agents');
        }
    })
})




// delete travel agent
app.post('/delete-travel-agent/', function(req, res) 
{
    let agent_id = req.body.agent_id;

    query1 = `DELETE FROM Travel_Agents WHERE agent_id = ?`;
    db.pool.query(query1, [agent_id], function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/travel_agents');
        }
    })
})




// update a travel_agent
app.post('/update-travel-agent-form', function(req, res) 
{
    let data = req.body;

    query1 = `UPDATE Travel_Agents SET first_name = '${data['update-travel-agent-first-name']}', last_name = '${data['update-travel-agent-last-name']}', email = '${data['update-travel-agent-email']}' WHERE agent_id = '${data['update-travel-agent-id']}'`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {

            res.redirect('/travel_agents');

                }

    })
});






// display travel packages
app.get('/travel_packages', function(req, res) {
    let data = req.body;

        let query1 = "SELECT * FROM Travel_Packages;";
        let query2 = "SELECT * FROM Travel_Agents;";
        let query3 = "SELECT * FROM Travelers;";
    
        db.pool.query(query1, function(error, rows, fields){
            
            let travel_packages = rows;
            
            db.pool.query(query2, (error, rows, fields) => {
                
                let travel_agents = rows;

                let agentmap = {}
                travel_agents.map(travel_agent => {
                    let id = parseInt(travel_agent.agent_id, 10);

                    agentmap[id] = `${travel_agent.first_name} ${travel_agent.last_name} (${travel_agent.agent_id})`
                })

                travel_packages = travel_packages.map(travel_agent => {
                    return Object.assign(travel_agent, {agent_id: agentmap[travel_agent.agent_id]})
                })


                db.pool.query(query3, (error, rows, fields) => {

                    let travelers = rows;

                    let travelermap = {}
                    travelers.map(traveler => {
                        let id = parseInt(traveler.traveler_id, 10);

                        travelermap[id] = `${traveler.first_name} ${traveler.last_name} (${traveler.traveler_id})`
                    })

                    travel_packages = travel_packages.map(traveler => {
                        return Object.assign(traveler, {traveler_id: travelermap[traveler.traveler_id]})
                    })

                    return res.render('travel_packages', {data: travel_packages, travel_agents: travel_agents, travelers: travelers});
            })
        })
    })
})



// DROP DOWN MIGHT WORK HAVEN'T TRIED IT WITH VPN YET
// insert a travel package
// maybe change total_cost??

app.post('/add-travel-package-form', function(req, res) 
{
    let data = req.body;

    let query1 = `INSERT INTO Travel_Packages(date, total_cost, description, traveler_id, agent_id) VALUES ('${data['input-package-date']}', 0, '${data['input-package-description']}', '${data['input-package-traveler-id']}', '${data['input-package-agent-id']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }


        else
        {
            res.redirect('/travel_packages');
        }
    })
})




// delete travel package
app.post('/delete-travel-package/', function(req, res) 
{
    let package_id = req.body.package_id;

    query1 = `DELETE FROM Travel_Packages WHERE package_id = ?`;
    db.pool.query(query1, [package_id], function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/travel_packages');
        }
    })
})



// update an travel package
app.post('/update-travel-package-form', function(req, res) 
{
    let data = req.body;

    query1 = `UPDATE Travel_Packages SET date ='${data['update-travel-package-date']}', description = '${data['update-travel-package-description']}', agent_id = '${data['update-travel-package-agent']}' WHERE package_id = '${data['update-travel-package-id']}'`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {

            res.redirect('/travel_packages');

                }

    })
});




// display items
app.get('/items', function(req, res) {
    let data = req.body;

        let query1 = "SELECT * FROM Items;";
        let query2 = "SELECT * FROM Item_Types;";
    
        db.pool.query(query1, function(error, rows, fields){
            
            let items = rows;
            
            db.pool.query(query2, (error, rows, fields) => {

                let item_types_rows = rows;

                let typemap = {}
                item_types_rows.map(item_type_row => {
                    let id = parseInt(item_type_row.item_type, 10);

                    typemap[id] = `${item_type_row.description} (${item_type_row.item_type})`
                })

                items = items.map(item_type_row => {
                    return Object.assign(item_type_row, {item_type: typemap[item_type_row.item_type]})
                })

                
                let item_types = rows;
                    return res.render('items', {data: items, item_types: item_types});
            })
        })
    })



// insert item

app.post('/add-item-form', function(req, res) 
{
    let data = req.body;

    let query1 = `INSERT INTO Items(description, cost, item_type) VALUES ('${data['input-item-description']}', '${data['input-item-cost']}', '${data['input-item-type']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }


        else
        {
            res.redirect('/items');
        }
    })
})


// delete item
app.post('/delete-item/', function(req, res) 
{
    let item_id = req.body.item_id;

    query1 = `DELETE FROM Items WHERE item_id = ?`;
    db.pool.query(query1, [item_id], function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/items');
        }
    })
})



// update an item


app.post('/update-item-form', function(req, res) 
{
    let data = req.body;

    query1 = `UPDATE Items SET description = '${data['update-item-description']}', cost = '${data['update-item-cost']}' WHERE item_id = '${data['update-item-id']}'`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {

            res.redirect('/items');

                }

    })
});





// display bookings
app.get('/bookings', function(req, res) {
    let data = req.body;

        let query1 = "SELECT * FROM Bookings;";

        let query2 = "SELECT * FROM Travel_Packages;";

        let query3 = "SELECT * FROM Items;";

        db.pool.query(query1, function(error, rows, fields){

            let bookings = rows;
            
            db.pool.query(query2, (error, rows, fields) => {
                
                let travel_packages = rows;

                travel_packages.unshift({ package_id: null, description: 'None' }); //

                let packagemap = {}
                travel_packages.map(travel_package => {
                    let id = parseInt(travel_package.package_id, 10);

                    packagemap[id] = `${travel_package.description} (${travel_package.package_id})`
                })

                bookings = bookings.map(travel_package => {
                    return Object.assign(travel_package, {package_id: packagemap[travel_package.package_id]})
                })


                db.pool.query(query3, (error, rows, fields) => {

                    let items = rows;

                    let itemmap = {}
                    items.map(item => {
                        let id = parseInt(item.item_id, 10);

                        itemmap[id] = `${item.description} (${item.item_id})`
                    })

                    bookings = bookings.map(item => {
                        return Object.assign(item, {item_id: itemmap[item.item_id]})
                    })
                    
                    return res.render('bookings', {data: bookings, travel_packages: travel_packages, items: items});
            })
        })
    })
})




// insert a booking -> Travel Packages is Nullable

app.post('/add-booking-form', function(req, res) {
    let data = req.body;

    let package_id = parseInt(req.body['input-booking-package-id']);
    if (isNaN(package_id)) 
    {
        package_id = null;
    }

    let quantity = data['input-booking-quantity'];
    let item_id = data['input-booking-item-id'];

    let query1 = `
        INSERT INTO Bookings (quantity, item_cost, subtotal, package_id, item_id) 
        VALUES (?, 
                (SELECT cost FROM Items WHERE item_id = ?), 
                (SELECT cost FROM Items WHERE item_id = ?) * ?, 
                ?, 
                ?)`;

    let query1Params = [quantity, item_id, item_id, quantity, package_id, item_id];

    db.pool.query(query1, query1Params, function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            if (package_id !== null) {
                let query2 = `
                    UPDATE Travel_Packages 
                    SET total_cost = (SELECT SUM(subtotal) FROM Bookings WHERE package_id = ?) 
                    WHERE package_id = ?`;
                
                let query2Params = [package_id, package_id];

                db.pool.query(query2, query2Params, function(error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.redirect('/bookings');
                    }
                });
            } else {
                res.redirect('/bookings');
            }
        }
    });
});




// update a booking -> Travel Packages is Nullable
app.post('/update-booking-form', function(req, res) {
    let data = req.body;

    let package_id = parseInt(req.body['update-booking-package-id']);
    if (isNaN(package_id)) 
    {
        package_id = null;
    }

    let booking_id = data['update-booking-id'];
    let quantity = data['update-booking-quantity'];
    let item_cost = data['update-booking-item-cost'];

    let query1 = `
        UPDATE Bookings SET quantity = ?, item_cost = ?, subtotal = (? * ?), package_id = ? WHERE booking_id = ?`;

    let query1Params = [quantity, item_cost, quantity, item_cost, package_id, booking_id];

    db.pool.query(query1, query1Params, function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            if (package_id !== null) {
                let query2 = `
                    UPDATE Travel_Packages 
                    SET total_cost = (SELECT SUM(subtotal) FROM Bookings WHERE package_id = ?) 
                    WHERE package_id = ?`;
                
                let query2Params = [package_id, package_id];

                db.pool.query(query2, query2Params, function(error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.redirect('/bookings');
                    }
                });
            } else {
                res.redirect('/bookings');
            }
        }
    });
});



// delete a booking
app.post('/delete-booking/', function(req, res) 
{
    let booking_id = req.body.booking_id;
    let package_id = req.body.package_id;

    query1 = `DELETE FROM Bookings WHERE booking_id = ?`;
    query2 = `UPDATE Travel_Packages SET total_cost = (SELECT SUM(subtotal) FROM Bookings WHERE package_id = ?) WHERE package_id = ?`;
    db.pool.query(query1, [booking_id], function(error, rows, fields){

            if (error) {
    
                console.log(error)
                res.sendStatus(400);
            }
    
            else
            {
                db.pool.query(query2, [package_id, package_id], function(error, rows, fields){
                    if (error) {
                        console.log(error)
                        res.sendStatus(400);
                }
        
                    else {
                        res.redirect('/bookings');
    
                    }
    
    
                })
            }
        })
    });





// display item types
app.get('/item_types', function(req, res)
    {  
        let query1 = "SELECT * FROM Item_Types;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('item_types', {data: rows});                  
        })                                                      
    });                                                         



// insert an item type
app.post('/add-item-type-form', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO Item_Types(description) VALUES ('${data['input-item-type-description']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/item_types');
        }
    })
})


// delete item type
app.post('/delete-item-type/', function(req, res) 
{
    let item_type = req.body.item_type;

    query1 = `DELETE FROM Item_Types WHERE item_type = ?`;
    db.pool.query(query1, [item_type], function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/item_types');
        }
    })
})



// update item types

app.post('/update-item-type-form', function(req, res) 
{
    let data = req.body;

    query1 = `UPDATE Item_Types SET description = '${data['update-item-type-description']}' WHERE item_type = '${data['update-item-type-id']}'`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {

            res.redirect('/item_types');

                }

    })
});


/*
    LISTENER
*/
app.listen(PORT, function(){           
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});