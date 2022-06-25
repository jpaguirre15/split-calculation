"use strict";

// **notes
// - will probably need to create <span> text for the text

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// MISC
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// SELECTORS

// -----
// selectors for the addTodo function
const formInput = document.querySelector('.form-control');
const addButton = document.querySelector('.btn');
const formList = document.querySelector('.list-group');



// check selector output
// console.log(formInput);
// console.log(addButton);
// console.log(formList);

// -----
// keep track of items in list, push items in the array
// keep as var so we can convert the values to Numbers
var items = [];

// -----
// selectors for the calculate function
const calculateButton = document.querySelector('#calculate');

// -----
// selectors for the tip buttons 
const tipGroup = document.querySelector('.btn-group');
const tipSelect = tipGroup.querySelectorAll('.btn-check');
let tip = 0;

// -----
// selector for the delete button
// see formList variable

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// EVENT LISTENERS

// -----
// add an item to the list
addButton.addEventListener('click', addTodo);

// -----
// calculate button
calculateButton.addEventListener('click', calculate)

// -----
// tip buttons
tipGroup.addEventListener('click', tipValue);

// -----
// delete button access
formList.addEventListener('click', deleteBtn);



// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// FUNCTIONS


// -----
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

    // create button tag (delete button)
    liTodo.innerHTML += '<button id="delete' + items.length + '" type="button" class="btn btn-danger btn-sm">Delete</button>';


    // append the li tag
    formList.appendChild(liTodo);

    // remove disable status when items are added
    calculateButton.disabled = false;

    // push price value into the array
    items.push(formInput.value);

    // clear to do input value
    formInput.value = '';

};

// -----
// extract tip value 
function tipValue(event) {

    for (let i = 0; i < tipSelect.length; i++) {
        // if button is selected, set that as the new tip value 
        if (tipSelect[i].checked === true) {
            console.log(tipSelect[i].value + ' is checked');
            tip = tipSelect[i].value;
        }
    }

}

// -----
// calculations 
function calculate(event) {
    // convert the whole array to numbers
    items = items.map(Number);

    // sum up everything in items array
    let total = items.reduce(function (a, b) {
        return a + b;

    }, 0);

    console.log(total);

    // get the tip value from the buttons 
    // see above (at selectors)
    // convert tip to decimal form
    tip = Number(tip);

    // // add it to the total
    // const tipTotal = tip * total;
    // console.log(tipTotal);

    // get the sales tax value from the sales tax
    const salesTax = document.querySelectorAll('.form-control')[1].value;
    const taxTotal = (salesTax * 0.01) * total;
    console.log(taxTotal);

    // add tax to current total
    total = Math.round((taxTotal + total) * 100) / 100;

    // calculate for tip (post-tax)
    const tipTotal = tip * total;
    console.log(tipTotal);

    // add it to the total, nearest tenths round
    total = Math.round((tipTotal + total) * 100) / 100;
    console.log(total);




    const stats = document.querySelector('.modal-body');
    stats.innerText = 'Total Due:' + formatter.format(total);


}


// // -----
// // delete button
// function deleteBtn(event) {
//     const deleteItem = event.target;
//     console.log(event.target);

//     // delete item line
//     if (deleteItem.classList[0] === "btn") {
//         formList.querySelector('.list-group-item').remove();
//         items.pop();

//     }

// }