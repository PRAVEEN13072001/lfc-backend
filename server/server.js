const express = require('express');
const app = express();
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to create a new name
app.post('/names', async (req, res) => {
  const { firstName, secondName } = req.body;
  
  try {
    const newName = await prisma.name.create({
      data: {
        firstName,
        secondName,
      },
    });
    res.status(201).json(newName);
  } catch (error) {
    console.error('Error creating name:', error);
    res.status(500).json({ error: 'Failed to create name' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
