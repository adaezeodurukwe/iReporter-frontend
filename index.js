const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

// Set port
const port = process.env.PORT || 8080;

// Set app to listen at port
app.listen(port);

module.exports = app;
