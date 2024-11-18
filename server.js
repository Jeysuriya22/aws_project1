const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// API route to get static expenses (for demonstration purposes)
app.get('/api/expenses', (req, res) => {
  const expenses = [
    { id: 1, name: 'Food', amount: 100 },
    { id: 2, name: 'Transport', amount: 50 },
    { id: 3, name: 'Entertainment', amount: 150 },
    { id: 4, name: 'Utilities', amount: 75 },
  ];
  res.json(expenses);
});

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Expense Tracker app listening at http://localhost:${port}`);
});
