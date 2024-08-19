const express = require('express');
const router = new express.Router();
let items = require('../fakeDb');

// GET /items - Get the list of items
router.get('/', (req, res) => {
  res.json(items);
});

// POST /items - Add an item to the list
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newItem = { name, price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a single item by name
router.get('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// PATCH /items/:name - Update a single item's name and/or price
router.patch('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name);
  if (item) {
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json({ updated: item });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// DELETE /items/:name - Delete a single item by name
router.delete('/:name', (req, res) => {
  const itemIndex = items.findIndex(i => i.name === req.params.name);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

module.exports = router;
