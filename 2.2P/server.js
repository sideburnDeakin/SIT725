const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to add two numbers
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const sum = num1 + num2;
  res.json({ result: sum });
});

// POST endpoint for basic calculator operations
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero' });
      }
      result = Number((num1 / num2).toFixed(4));
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});