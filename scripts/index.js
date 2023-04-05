let todos = [];

async function getTodos() {
  try {
    let response = await fetch("http://localhost:3000/todos");
    let responseData = await response.json();
    todos = responseData;
    displayTodos();
  } catch (err) {
    console.log(err);
  }
}


function displayTodos() {
    console.log(todos);
    document.querySelector("tbody").innerHTML = "";
    todos.map(function (elem) {
      var row = document.createElement("tr");

      var td1 = document.createElement("td");
      td1.innerText = elem.id;

      var td2 = document.createElement("td");
      td2.innerText = elem.taskname;

      var td7 = document.createElement("td");
      td7.innerText = "Delete";
      td7.style.backgroundColor="red";
      td7.style.color="white";

    //   td7.addEventListener("click", function () {
    //     addTodelete(elem);
    //   });

      
      row.append(td1, td2,td7);

      document.querySelector("tbody").append(row);
    });
  }