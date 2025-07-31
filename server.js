const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS so your frontend can access it
app.use(cors());
app.use(express.json());

// Root route - shows that the server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'Crypto Backend Server is running!', 
    endpoints: ['/api/prices'],
    status: 'active'
  });
});

// Simple endpoint to get all prices
app.get('/api/prices', async (req, res) => {
  try {
    const response = await fetch('https://api.coinlore.net/api/tickers/?start=0&limit=100');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Get prices at: http://localhost:${PORT}/api/prices`);
});