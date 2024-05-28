// // Get the objects we need to modify
// let addTravelerForm = document.getElementById('add-traveler-form-ajax');

// // Modify the objects we need
// addTravelerForm.addEventListener("submit", function (e) {
    
//     // Prevent the form from submitting
//     e.preventDefault();

//     // Get form fields we need to get data from
//     let inputFullName = document.getElementById("input-fullname");
//     let inputEmail = document.getElementById("input-email");
//     let inputNumber = document.getElementById("input-number");

//     // Get the values from the form fields
//     let fullNameValue = inputFullName.value;
//     let emailValue = inputEmail.value;
//     let numberValue = inputNumber.value;

//     // Put our data we want to send in a javascript object
//     let data = {
//         fullname: fullNameValue,
//         email: emailValue,
//         number: numberValue,
//     }
    
//     // Setup our AJAX request
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "/add-traveler-ajax", true);
//     xhttp.setRequestHeader("Content-type", "application/json");

//     // Tell our AJAX request how to resolve
//     xhttp.onreadystatechange = () => {
//         if (xhttp.readyState == 4 && xhttp.status == 200) {

//             // Add the new data to the table
//             addRowToTable(xhttp.response);

//             // Clear the input fields for another transaction
//             inputFullName.value = '';
//             inputEmail.value = '';
//             inputNumber.value = '';
//         }
//         else if (xhttp.readyState == 4 && xhttp.status != 200) {
//             console.log("There was an error with the input.")
//         }
//     }

//     // Send the request and wait for the response
//     xhttp.send(JSON.stringify(data));

// })


// // Creates a single row from an Object representing a single record from 
// // bsg_people
// addRowToTable = (data) => {

//     // Get a reference to the current table on the page and clear it out.
//     let currentTable = document.getElementById("people-table");

//     // Get the location where we should insert the new row (end of table)
//     let newRowIndex = currentTable.rows.length;

//     // Get a reference to the new row from the database query (last object)
//     let parsedData = JSON.parse(data);
//     let newRow = parsedData[parsedData.length - 1]

//     // Create a row and 4 cells
//     let row = document.createElement("TR");
//     let idCell = document.createElement("TD");
//     let fullNameCell = document.createElement("TD");
//     let emailCell = document.createElement("TD");
//     let numberCell = document.createElement("TD");

//     let deleteCell = document.createElement("TD");

//     // Fill the cells with correct data
//     idCell.innerText = newRow.id;
//     fullNameCell.innerText = newRow.fname;
//     emailCell.innerText = newRow.lname;
//     numberCell.innerText = newRow.number;
    
//     deleteCell = document.createElement("button");
//     deleteCell.innerHTML = "Delete";
//     deleteCell.onclick = function(){
//         deleteTraveler(newRow.id);
//     };



//     // Add the cells to the row 
//     row.appendChild(idCell);
//     row.appendChild(fullNameCell);
//     row.appendChild(emailCell);
//     row.appendChild(numberCell);
//     row.appendChild(deleteCell);
    
//     // Add a custom row attribute so the deleteRow function can find a newly added row
//     row.setAttribute('data-value', newRow.id);

//     // Add the row to the table
//     currentTable.appendChild(row);

//     // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
//     // Find drop down menu, create a new option, fill data in the option (full name, id),
//     // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
//     let selectMenu = document.getElementById("mySelect");
//     let option = document.createElement("option");
//     option.text = newRow.fullname
//     option.value = newRow.id;
//     selectMenu.add(option);
//     // End of new step 8 code.
// }