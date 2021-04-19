let totalExpense = 0;

//Get the heading element
const headingEl = document.querySelector("#headingTotal");

//Get the reference
const inputDescEl = document.querySelector("#inputDesc");

//ref to input amount
const inputElement = document.querySelector("#inputAmount");

//getting the ref to the table
const expenseTableEl = document.querySelector("#expenseTable");

//Set the heading element to totalExpense
headingEl.textContent = totalExpense;

// All expenses at one place
const allExpenses = [];

function AddExpenseToTotal(){
    const expenseItem = {};

    //Listen in the input section
    const textAmount = inputElement.value;

    //Read the input from the desc
    const textDesc = inputDescEl.value;

    //Convert the string to int
    const expense = parseInt(textAmount,10);

    //put it in object
    expenseItem.desc = textDesc;
    expenseItem.amount = expense;

    allExpenses.push(expenseItem);
    
    //add current expense to total expense
    totalExpense = totalExpense + expense; 

    //Set heading element to totalExpense
    const someText = `Total is: ${totalExpense}`;
    headingEl.textContent = someText;

    // Show the table here
    const data1 = allExpenses[0];
    const data2 = allExpenses[1];

    const data1Text = `${data1.amount}:: ${data1.desc}`;
    const data2Text = `${data2.amount}:: ${data2.desc}`

    const tableText = `
        <div>${data1Text}</div>
        <div>${data2Text}</div>
    `
    expenseTableEl.innerHTML = tableText;

}

//Get the button element
const element = document.querySelector("#btnAddExpense");

//Listen to the button click
element.addEventListener("click", AddExpenseToTotal, false);

counterIncrement();
