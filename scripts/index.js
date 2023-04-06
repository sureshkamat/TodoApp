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

      var update=document.createElement("td")
      update.textContent="📝";
      update.addEventListener("click",function(r){
        r.preventDefault()
        updateTodo(elem,td2);
      })




      var td7 = document.createElement("td");
      td7.innerText = "Delete";
      td7.style.backgroundColor="red";
      td7.style.color="white";

      td7.addEventListener("click", function () {
        addTodelete(elem);
      });

      
      row.append(td1, td2,update,td7);

      document.querySelector("tbody").append(row);
    });
  }




  //addd to tasj json file code
document.getElementById("addbtn").addEventListener("click",addTodo);

  async function addTodo() {
    try {
      let todoTask = document.getElementById('addtext').value
      let response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "taskname": todoTask
        })
      });
  
      if(response.status == 201) {
        console.log('Successfully created!')
      } else {
        console.log('Something went wrong!')
      }
    } catch (err) {
      console.log(err);
    }
  }
  

//delete task
async function addTodelete(elem) {
  try {
		 let response = await fetch("http://localhost:3000/todos/" + Number(elem.id), {
			method: "DELETE"
		});

		if(response.status == 200) {
			console.log('Successfully deleted!')
		} else {
			console.log('Something went wrong!')
		}
  } catch (err) {
    console.log(err);
  }
}

//add to update
async function updateTodo(elem,td2) {
  try {   
		var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute("id","updatedvalue")
    input.setAttribute("value",elem.taskname);
    td2.textContent=""; 
    let btn=document.createElement("button");
    
    btn.setAttribute("id","updatedbtn");
    btn.textContent="Update";
    btn.addEventListener("click",function(){
      submitUpdate(elem);
    })
    td2.append(input,btn);

		
  } catch (err) {
    console.log(err);
  }
}

async function submitUpdate(elem){
  let todoTaskToUpdate = document.getElementById('updatedvalue').value

     let response = await fetch("http://localhost:3000/todos/" + Number(elem.id), {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"taskname": todoTaskToUpdate
			})
		});

		if(response.status == 200) {
			console.log('Successfully updated!')
		} else {
			console.log('Something went wrong!')
		}  
}




  getTodos();