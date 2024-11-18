const express = require('express');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// AWS S3 configuration
const s3 = new S3Client({
  region: 'us-east-1', // Replace with your AWS region
});

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

// API route to save expenses to S3
app.post('/api/save-expenses', async (req, res) => {
  const expenses = req.body;

  if (!expenses || !Array.isArray(expenses)) {
    return res.status(400).send('Invalid expenses data');
  }

  const fileName = `expenses_${new Date().toISOString()}.json`; // File name with timestamp
  const params = {
    Bucket: 'my-expence-tracker', // Replace with your bucket name
    Key: fileName,
    Body: JSON.stringify(expenses),
    ContentType: 'application/json',
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    res.status(200).send('Expenses saved to S3 successfully');
  } catch (err) {
    console.error('Error uploading to S3:', err);
    res.status(500).send('Error saving expenses');
  }
});

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Expense Tracker app listening at http://localhost:${port}`);
});
