"use strict";


// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// SELECTORS

// -----
// selectors for the addTodo function
const formInput = document.querySelector('.form-control');
const addButton = document.querySelector('.btn');
const formList = document.querySelector('.list-group');


// -----
// keep track of items in list, push items in the array
// keep as var so we can convert the values to Numbers
let items = [];

// -----
// selectors for the calculate function
const calculateButton = document.querySelector('#calculate');

// -----
// selectors for the tip buttons 
const tipGroup = document.querySelector('.btn-group');
const tipSelect = tipGroup.querySelectorAll('.btn-check');
const customTip = document.querySelector('#custom-tip');
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

    // create html '<li>' element: 
    // <li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">... </li>
    const liItems = document.createElement('li');
    // add class list of li 
    liItems.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "border-start-0", "border-top-0", "border-end-0", "border-bottom", "rounded-0", "mb-2");

    // create html '<div>' element:
    // <div id="item0" class="d-flex align-items-center"> ... </div>
    const divItems = document.createElement('div');
    // set id attribute of div
    divItems.setAttribute('id', 'item' + items.length);
    // add class list of div
    divItems.classList.add("d-flex", "align-items-center");

    // append the div tag
    // li (parent)
    //  - div (child)
    liItems.appendChild(divItems);

    // // create html '<input>' element:
    // // <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />
    // const checkbox = document.createElement('input');
    // // add class list of input 
    // checkbox.classList.add('form-check-input', 'me-2');
    // // add type of input
    // checkbox.type = "checkbox";
    // // add value of input
    // checkbox.value = "";
    // // add ariaLabel of input 
    // checkbox.ariaLabel = "...";

    // // append the input tag 
    // // li (parent-parent)
    // // - div (parent)
    // //   - input (child)
    // divItems.appendChild(checkbox);

    // name of list that is added before the closing div tag
    // THIS IS A VUNERABILITY and UNSECURE
    // create an if statement that says if input is not a number or a dot, alert user that they didn't insert a number 
    divItems.innerHTML += formInput.value;

    // create button tag (delete button)
    liItems.innerHTML += '<button id="delete' + items.length + '" type="button" class="btn btn-danger btn-sm">Delete</button>';

    // append the li tag
    // ul (parent)
    // - li (child)
    formList.appendChild(liItems);

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
            // if tip is not custom % 
            if (tipSelect[i].value === '.15' || tipSelect[i].value === '0' || tipSelect[i].value === '.18' || tipSelect[i].value === '.20') {
                console.log(tipSelect[i].value + ' is checked');
                tip = tipSelect[i].value;

                // create an if statement for if the custom box is showing, remove it 
                if (document.querySelector('#form-tip') !== null) {
                    document.querySelector('#form-tip').remove();
                }
            }
            // if tip is customed (do it for dollar value)
            else {
                // disable for now 

                event.preventDefault();
                console.log(tipSelect[i].value + ' is checked');
                console.log('is it really?');

                // structure: form -> div -> span -- input 

                // create <form> tag 
                if (document.querySelector('#form-tip') === null) {
                    const formTip = document.createElement('form');
                    formTip.id = "form-tip";
                    formTip.classList.add('d-flex');
                    formTip.classList.add('justify-content-center');
                    formTip.classList.add('align-items-center');
                    formTip.classList.add('mb-4');

                    // create <div> tag
                    const divTip = document.createElement('div');
                    divTip.classList.add('form-outline');
                    divTip.classList.add('flex-fill');

                    formTip.appendChild(divTip);
                    console.log(formTip.appendChild(divTip));

                    // create <span> tag
                    const spanTip = document.createElement('span');
                    spanTip.classList.add("input-group-text");
                    spanTip.innerText = "$"

                    divTip.appendChild(spanTip);


                    const inputTip = document.createElement('input');
                    inputTip.type = "text";
                    inputTip.id = "form3";
                    inputTip.classList.add("form-control");
                    inputTip.ariaLabel = "Enter price(s) here, numbers only)";

                    divTip.appendChild(inputTip);


                    customTip.appendChild(formTip);

                    customTip.innerHTML += '<h6 class="mb-3">Sub Total</h6>';

                    // // for subtotal 
                    // // create <form> tag 
                    // formTip = document.createElement('form');
                    // formTip.id = "form-tip";
                    // formTip.classList.add('d-flex');
                    // formTip.classList.add('justify-content-center');
                    // formTip.classList.add('align-items-center');
                    // formTip.classList.add('mb-4');

                    // // create <div> tag
                    // divTip = document.createElement('div');
                    // divTip.classList.add('form-outline');
                    // divTip.classList.add('flex-fill');

                    // formTip.appendChild(divTip);
                    // console.log(formTip.appendChild(divTip));

                    // // create <span> tag
                    // spanTip = document.createElement('span');
                    // spanTip.classList.add("input-group-text");
                    // spanTip.innerText = "$"

                    // divTip.appendChild(spanTip);


                    // inputTip = document.createElement('input');
                    // inputTip.type = "text";
                    // inputTip.id = "form3";
                    // inputTip.classList.add("form-control");
                    // inputTip.ariaLabel = "Enter price(s) here, numbers only)";

                    // divTip.appendChild(inputTip);


                    // customTip.appendChild(formTip);


                    // // change input value of custom 
                    // tip = tipSelect[i].value;

                }
            }
        }

    }
}

// -----
// calculations 
function calculate(event) {

    // modal selector
    const stats = document.querySelector('.modal-body');

    // convert the whole array to numbers
    items = items.map(Number);

    // sum up everything in items array
    let total = items.reduce(function (a, b) {
        return a + b;

    }, 0);

    // sum up everything in items array
    let total1 = items.reduce(function (a, b) {
        return a + b;

    }, 0);


    console.log(total);
    stats.innerHTML = 'Sub Total: ' + formatter.format(total) + "\r\n\r\n";




    // get the tip value from the buttons 
    // see above (at selectors)
    // convert tip to decimal form
    tip = Number(tip);

    // // add it to the total
    // const tipTotal = tip * total;
    // console.log(tipTotal);

    if (tip === .15 || tip === 0 || tip === .18 || tip === .20) {

        // Post Tax Calculations 

        stats.innerHTML += "<strong>" + 'Post-Tax Tip Calculation' + "</strong>" + "\r\n";

        // get the sales tax value from the sales tax
        const salesTax = document.querySelectorAll('.form-control')[1].value;
        const taxTotal = (salesTax * 0.01) * total;
        console.log(taxTotal);
        stats.innerHTML += 'Tax Total: ' + formatter.format(taxTotal) + "\r\n";


        // add tax to current total
        total = Math.round((taxTotal + total) * 100) / 100;

        // calculate for tip (post-tax)
        const tipTotal = tip * total;
        console.log(tipTotal);
        stats.innerHTML += 'Tip Total: ' + formatter.format(tipTotal) + "\r\n";


        // add it to the total, nearest tenths round
        total = Math.round((tipTotal + total) * 100) / 100;
        console.log(total);


        // insert grand total into the modal
        stats.innerHTML += 'Grand Total: ' + formatter.format(total) + "\r\n\r\n";

        // Pre Tax Tip Calculations

        stats.innerHTML += "<strong>" + 'Pre-Tax Tip Calculation' + "</strong>" + "\r\n";

        // get the sales tax value from the sales tax
        const salesTax1 = document.querySelectorAll('.form-control')[1].value;
        const taxTotal1 = (salesTax1 * 0.01) * total1;
        console.log(taxTotal1);
        stats.innerHTML += 'Tax Total: ' + formatter.format(taxTotal1) + "\r\n";

        // calculate for tip (pre-tax)
        const tipTotal1 = tip * total1;
        console.log(tipTotal1);
        stats.innerHTML += 'Tip Total: ' + formatter.format(tipTotal1) + "\r\n";



        // add it to the total, nearest tenths round
        total1 = Math.round((tipTotal1 + taxTotal1 + total1) * 100) / 100;
        console.log(total1);


        // insert grand total into the modal
        stats.innerText += 'Grand Total: ' + formatter.format(total1);



    }
    else {
        const salesTax = document.querySelectorAll('.form-control')[2].value;
        const taxTotal = (salesTax * 0.01) * total;
        console.log(taxTotal);
        // stats.innerText += 'Tax Total: ' + formatter.format(taxTotal) + "\r\n";


        // add tax to current total
        total = Math.round((taxTotal + total) * 100) / 100;

        // calculate for tip (post-tax)
        tipTotal = tip / total;
        // convert it into percent 
        tipTotal = tipTotal * total;
        console.log(tipTotal);
        stats.innerHTML += 'Tip Total: ' + formatter.format(tipTotal) + "\r\n";


        // add it to the total, nearest tenths round
        total = Math.round((tipTotal + total) * 100) / 100;
        console.log(total);



        // insert grand total into the modal
        stats.innerText = 'Grand Total: ' + formatter.format(total);

    }


}


// -----
// delete button
function deleteBtn(event) {

    // event.target shows the html element of what is clicked
    const deleteItem = event.target;

    // will output the html line of the delete button 
    console.log(event.target);


    // access id of the delete button that was pressed
    let deleteID = event.target.id;
    console.log(deleteID);
    console.log(typeof (deleteID));

    console.log(document.querySelector('#' + deleteID));
    console.log(document.querySelector('#' + deleteID).parentNode);


    // only delete if the button is pressed 
    if (deleteItem.classList[0] === "btn") {



        // pop the element in the array
        // convert array to numbers
        items = items.map(Number);
        // access text of div element to get the value 
        let divValue = document.querySelector('#item' + numberExtract(deleteID));

        // make it into a number 
        divValue = Number(divValue.innerText);
        console.log(divValue);
        // value to be removed, make it into an index
        const index = items.indexOf(divValue)
        if (index > -1) {
            items.splice(index, 1); // 2nd parameter means remove one item only
        }

        // delete item line
        document.querySelector('#' + deleteID).parentNode.remove();
    }


}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// MISC
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// -----
// extract number from ID's 
function numberExtract(text) {
    let number = text.match(/\d/g);
    number = number.join("");
    return number;
}