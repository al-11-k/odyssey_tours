// Citation for the following file:
// Date: 05/22/2024
// Adapted from nodejs-starter-app on github.com provided to students via Canvas/course materials
// Code was copied and pasted from the code snippets and changed to fit the database needs for project
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteTraveler(traveler_id) {
    let data = {
        id: traveler_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-traveler-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(traveler_id);
            deleteDropDownMenu(traveler_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(traveler_id){

    let table = document.getElementById("travelers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == traveler_id) {
            table.deleteRow(i);
            break;
       }
    }
}

function deleteDropDownMenu(traveler_id){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(traveler_id)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }