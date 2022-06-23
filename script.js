"use strict";

// **notes
// - will probably need to create <span> text for the text

// SELECTORS

// selectors for the addTodo function
const formInput = document.querySelector('.form-control');
const addButton = document.querySelector('.btn');
const formList = document.querySelector('.list-group');

// check selector output
console.log(formInput);
console.log(addButton);
console.log(formList);



// keep track of items in list, push items in the array
const items = [];


// -----
// EVENT LISTENERS

// add an item to the list
addButton.addEventListener('click', addTodo);



// -----
// FUNCTIONS

// add an item to the list 
function addTodo(event) {
    // stop page from refreshing
    event.preventDefault();

    // structure: <li> --> <div> --> <input> 

    // create li tag 
    const liTodo = document.createElement('li');

    liTodo.classList.add("list-group-item")
    liTodo.classList.add("d-flex")
    liTodo.classList.add("justify-content-between")
    liTodo.classList.add("align-items-center")
    liTodo.classList.add("border-start-0")
    liTodo.classList.add("border-top-0")
    liTodo.classList.add("border-end-0")
    liTodo.classList.add("border-bottom")
    liTodo.classList.add("rounded-0")
    liTodo.classList.add("mb-2")
    // liTodo.innerText = formInput.value;

    // create div tag (inside li tag)
    const divTodo = document.createElement('div');

    divTodo.setAttribute('id', 'item' + items.length);

    divTodo.classList.add("d-flex");
    divTodo.classList.add("align-items-center");


    // append the div tag (inside li tag)
    liTodo.appendChild(divTodo);

    // create input tag (inside div tag)
    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.classList.add('me-2');
    checkbox.type = "checkbox";
    checkbox.value = "";
    checkbox.ariaLabel = "...";

    // append the input tag (inside div tag)
    divTodo.appendChild(checkbox);

    // name of list that is added before the closing div tag
    divTodo.innerHTML += formInput.value;

    // append the li tag
    formList.appendChild(liTodo);

    // push price value into the array
    items.push(formInput.value);

    // clear to do input value
    formInput.value = '';



};

function strikeText(event) {




}; 