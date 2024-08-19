const express = require('express');
const app = express();
const itemsRoutes = require('./routes/items');

app.use(express.json());
app.use('/items', itemsRoutes);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

module.exports = app;
