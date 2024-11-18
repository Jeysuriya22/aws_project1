// Expense tracker variables
let monthlyBudget = 0;
let expenses = [];
let totalExpenses = 0;

// Function to set the monthly budget
function setBudget() {
  const budget = document.getElementById("monthly-budget").value;
  if (budget && budget > 0) {
    monthlyBudget = parseFloat(budget);
    updateSummary();
    alert("Monthly budget set successfully!");
  } else {
    alert("Please enter a valid budget.");
  }
}

// Function to add an expense
function addExpense() {
  const date = document.getElementById("expense-date").value;
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (!date || !description || !amount || amount <= 0) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Add expense to the list
  const expense = { date, description, amount };
  expenses.push(expense);
  totalExpenses += amount;

  // Add to expense list
  const expenseList = document.getElementById("expense-list");
  const expenseItem = document.createElement("li");
  expenseItem.innerHTML = `${expense.date} - ${expense.description} - $${expense.amount.toFixed(2)}`;
  expenseList.appendChild(expenseItem);

  // Update the summary
  updateSummary();

  // Clear the form fields
  document.getElementById("expense-date").value = "";
  document.getElementById("expense-description").value = "";
  document.getElementById("expense-amount").value = "";
}

// Function to update the summary (total expenses, savings, and remaining budget)
function updateSummary() {
  const remainingBudget = monthlyBudget - totalExpenses;
  const monthlySavings = remainingBudget > 0 ? remainingBudget : 0;

  document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("remaining-budget").textContent = remainingBudget.toFixed(2);
  document.getElementById("monthly-savings").textContent = monthlySavings.toFixed(2);
}
