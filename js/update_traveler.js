// Citation for the following file:
// Date: 05/22/2024
// Adapted from nodejs-starter-app on github.com provided to students via Canvas/course materials
// Code was copied and pasted from the code snippets and changed to fit the database needs for project
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let updateTravelerForm = document.getElementById('update-traveler-form-ajax');

// Modify the objects we need
updateTravelerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputEmail = document.getElementById("update-traveler-email");
    let inputPhoneNumber = document.getElementById("update-traveler-phone-number");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        email: emailValue,
        phone_number: phoneNumberValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-traveler-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, traveler_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("travelers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == traveler_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
