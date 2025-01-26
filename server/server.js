const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose Schema and Model
const ItemSchema = new mongoose.Schema({
  message: String,
});
const Item = mongoose.model('Item', ItemSchema);

// API routes
// Get data
app.get('/api/data', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Add or update data
app.post('/api/data', async (req, res) => {
  const { message } = req.body;
  try {
    let item = await Item.findOne();
    if (item) {
      item.message = message;
      await item.save();
    } else {
      item = new Item({ message });
      await item.save();
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
