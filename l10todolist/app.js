var getform = document.getElementById("form");
var gettextbox = document.getElementById("textbox");
var getul = document.getElementById("list-group");

getform.addEventListener("submit",function(e){
	e.preventDefault(); // use this not to reload after submitting form
	addnew();
})

function addnew(todo){
	var todotext = gettextbox.value;
	// console.log(todotext);

	if(todo){
		todotext = todo.text
	}

	if(todotext){
		const li =document.createElement("li");

		if(todo && todo.done){
			li.classList.add("done")
		}

		li.appendChild(document.createTextNode(todotext));
		// console.log(li);

		getul.appendChild(li);
		gettextbox.value = "";

		updatelocalstorage();

			// left click
		li.addEventListener("click",function(){
			li.classList.toggle("done");
			updatelocalstorage();
		})

			// right click = contextmenu
		li.addEventListener("contextmenu",function(){
			li.remove();
			updatelocalstorage();
		})
	}

	
}

function updatelocalstorage(){
	var getalllis = document.querySelectorAll("li");
	// console.log(getalllis); // NodeList (can make it into looping with forEach loop)

	const todos = [];

	getalllis.forEach(function(getallli){
		todos.push({
			text:getallli.textContent,
			done:getallli.classList.contains("done")
		})
	})
	// console.log(todos);

	localStorage.setItem("todos",JSON.stringify(todos));
}

var getlstodos = JSON.parse(localStorage.getItem("todos"))
// console.log(getlstodos);

if(getlstodos){
	getlstodos.forEach(function(getlstodo){
		// console.log(getlstodo);
		// console.log(getlstodo.text)
		addnew(getlstodo);
	})
}
