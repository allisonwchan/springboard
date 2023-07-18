document.addEventListener("DOMContentLoaded", function() {
    let button = document.querySelector("button");
    let inputTodo = document.querySelector("#todo");
    let todoList = document.querySelector("#todo-list");
    let todoForm = document.querySelector("#todo-form");

    // adding new li and remove button
    todoForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let newTodo = document.createElement('li');
        let newButton = document.createElement('button');
        
        newTodo.innerText = inputTodo.value;
        newButton.innerText = "X";

        todoList.appendChild(newTodo);
        newTodo.appendChild(newButton);

        todoForm.reset();

    });

    // remove li
    todoList.addEventListener('click', function(e) {
        
        if (e.target.tagName === 'LI') {
            e.target.style.textDecoration = "line-through";
        } else if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
        }
        
    })

    // form.addEventListener("click", function(e) {
    //     if (e.target.tagName === "BUTTON") {
    //         e.target.parentElement.remove();
    //     }
    // });
})

