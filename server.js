const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk'); // Import AWS SDK

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
  accessKeyId: 'AKIAST6S7CZ3H5UYUBL5', // Replace with AKIAST6S7CZ3H5UYUBL5your AWS access key
  secretAccessKey: 'Rk4BwvcblCaslCcGheDVzmL/VL9w53h2KR5LHeP8', // Replace with your AWS secret key
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'my-expence-tracker'; // Replace with your bucket name

// API route to upload expenses to S3
app.post('/api/upload-expenses', (req, res) => {
  const expenses = req.body;

  if (!expenses || !Array.isArray(expenses)) {
    return res.status(400).json({ error: 'Invalid expenses data' });
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: `expenses-${Date.now()}.json`, // Unique file name
    Body: JSON.stringify(expenses, null, 2),
    ContentType: 'application/json',
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      return res.status(500).json({ error: 'Failed to upload expenses to S3' });
    }

    console.log('Upload successful:', data.Location);
    res.status(200).json({ message: 'Expenses uploaded successfully', url: data.Location });
  });
});

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
