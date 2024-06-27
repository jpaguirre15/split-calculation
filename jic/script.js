"use strict";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// GLOBAL VARIABLES

let items = [];

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// SELECTORS

const formInput = document.querySelector('.form-control');
const addButton = document.querySelector('.btn');
const formList = document.querySelector('.list-group');
const calculateButton = document.querySelector('#calculate');
const tipGroup = document.querySelector('.btn-group');
const tipSelect = tipGroup.querySelectorAll('.btn-check');
const customTipInput = document.querySelector('#custom-tip-input');
const customTipField = document.querySelector('#custom-tip');
const preTaxTab = document.querySelector('#pre-tax');
const postTaxTab = document.querySelector('#post-tax');

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// EVENT LISTENERS

addButton.addEventListener('click', addItem);
calculateButton.addEventListener('click', calculateClick);
tipGroup.addEventListener('change', handleTipChange);
formList.addEventListener('click', deleteBtn);
formInput.addEventListener('input', checkCalculateButtonState);
customTipField.addEventListener('input', checkCalculateButtonState);

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// FUNCTIONS

// add an item to the list 
function addItem(event) {
    event.preventDefault();

    const inputValues = formInput.value.split(/[\s,]+/);

    inputValues.forEach(value => {
        if (value.trim() !== '') {
            createListItem(value.trim());
            items.push(Number(value.trim()));
        }
    });

    formInput.value = '';
    checkCalculateButtonState();
}

// create list item
function createListItem(value) {
    const liItems = document.createElement('li');
    liItems.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "border-start-0", "border-top-0", "border-end-0", "border-bottom", "rounded-0", "mb-2");

    const divItems = document.createElement('div');
    divItems.setAttribute('id', 'item' + items.length);
    divItems.classList.add("d-flex", "align-items-center");
    divItems.innerHTML = value;

    liItems.appendChild(divItems);
    liItems.innerHTML += '<button id="delete' + items.length + '" type="button" class="btn btn-danger btn-sm">Delete</button>';
    formList.appendChild(liItems);
}

// handle tip change
function handleTipChange(event) {
    const selectedTip = event.target.value;
    if (selectedTip === 'custom') {
        customTipInput.style.display = 'block';
    } else {
        customTipInput.style.display = 'none';
    }
    checkCalculateButtonState();
}

// extract tip value 
function tipValue() {
    for (let i = 0; i < tipSelect.length; i++) {
        if (tipSelect[i].checked) {
            const tip = tipSelect[i].value;
            if (tip === 'custom') {
                return parseFloat(customTipField.value) / itemSum(items);
            }
            return tip;
        }
    }
    return 0;
}

// createReceipt
function createReceipt(subTotal, tax, tip, grandTotal, status) {
    return `<strong>${status} Tax Tip Calculation</strong><br>
            Sub Total: ${formatter.format(subTotal)}<br>
            Tax Total: ${formatter.format(tax)}<br>
            Tip Total: ${formatter.format(tip)}<br>
            You Owe: ${formatter.format(grandTotal)}<br><br>`;
}

// preTax and postTax Tip Calculations 
function calculations(object, status) {
    const newObject = Object.create(object);
    newObject.tip = status === "Pre" ? newObject.preTaxTipCalc() : newObject.postTaxTipCalc();
    newObject.grandTotal = newObject.grandTotalCalc();
    return createReceipt(object.subTotal, object.tax, newObject.tip, newObject.grandTotal, status);
}

// calculateClick function  
function calculateClick(event) {
    // Clear the modal content
    preTaxTab.innerHTML = '';
    postTaxTab.innerHTML = '';

    const salesTax = parseFloat(document.querySelector('#sales-tax').value) / 100;
    const receipt = {
        subTotal: itemSum(items),
        tax: null,
        tip: null,
        grandTotal: null,
        taxCalc() {
            return salesTax * this.subTotal;
        },
        preTaxTipCalc() {
            return this.subTotal * tipValue();
        },
        postTaxTipCalc() {
            return (this.subTotal + this.tax) * tipValue();
        },
        grandTotalCalc() {
            return this.subTotal + this.tax + this.tip;
        },
    };
    receipt.tax = receipt.taxCalc();
    preTaxTab.innerHTML += calculations(receipt, "Pre");
    postTaxTab.innerHTML += calculations(receipt, "Post");
}

// delete button
function deleteBtn(event) {
    const deleteItem = event.target;
    let deleteID = event.target.id;
    if (deleteItem.classList[0] === "btn") {
        items = items.map(Number);
        let divValue = document.querySelector('#item' + numberExtract(deleteID));
        divValue = Number(divValue.innerText);
        const index = items.indexOf(divValue);
        if (index > -1) {
            items.splice(index, 1);
        }
        document.querySelector('#' + deleteID).parentNode.remove();
    }
    checkCalculateButtonState();
}

// check if calculate button should be enabled
function checkCalculateButtonState() {
    const isCustomTipSelected = document.querySelector('#btnradio4').checked;
    const isCustomTipEmpty = isCustomTipSelected && customTipField.value.trim() === '';
    calculateButton.disabled = items.length === 0 || isCustomTipEmpty;
}

// format numbers into USD 
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// extract number from ID's 
function numberExtract(text) {
    let number = text.match(/\d/g);
    number = number.join("");
    return number;
}

// sum up array 
const itemSum = (arr) => {
    let sum = arr.reduce(function (a, b) {
        return a + b;
    }, 0);
    return sum;
}
