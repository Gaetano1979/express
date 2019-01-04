// ==============================
// declaramos costante para EXPRESS
// ==============================
const express = require('express');

// ==============================
// declaramos costante app para usar express
// ==============================
const app = express();

app.use(require('./get/get.js'));
// app.use(require('./login.js'));

module.exports = app;