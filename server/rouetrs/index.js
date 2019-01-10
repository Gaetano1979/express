// ==============================
// declaramos costante para EXPRESS
// ==============================
const express = require('express');

// =============================
// importamos las config de Mysql
// =============================
const mysql = require('../../mysql/mysqlapp');

// ==============================
// declaramos costante app para usar express
// ==============================
const app = express();
// =============================
// apriamo la conessione
// =============================
mysql.conessioneaperte();

// app.use(require('./get/get.js'));
app.use(require('./get/clientes.js'));
app.use(require('./get/caja.js'));
app.use(require('./get/pagos'));




module.exports = app;