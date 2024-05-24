// Citation for the following file:
// Date: 05/22/2024
// Adapted from nodejs-starter-app on github.com provided to students via Canvas/course materials
// Code was copied and pasted from the code snippets and changed to fit the database needs for project
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateTravelerForm = document.getElementById('update-traveler-form-ajax');

updateTravelerForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputEmail = document.getElementById("update-email");
    let inputNumber = document.getElementById("update-number");

    let fullNameValue = inputFullName.value;
    let email = inputEmail.value;
    let phone_number = inputNumber.value;
t
    let data = {
        fullname: fullNameValue,
        email: emailValue,
        phone_number: numberValue
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-traveler-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


function updateRow(data, traveler_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("travelers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == traveler_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name; 
       }
    }
}
