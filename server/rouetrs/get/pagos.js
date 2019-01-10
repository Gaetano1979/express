// import express from 'express';
const express = require('express');
// =============================
// declaramos el cors
// =============================
const cors = require('cors');
// =============================
// importamos las config de Mysql
// =============================
const mysql = require('../../../mysql/mysqlapp');

// =============================
// importamos las config de las querys
// =============================
const querys = require('../../../mysql/query');

const Recibo = require('../../../models/recibos.js')

const app = express();
// =============================
// utilizamos el cors
// =============================
app.use(cors());






module.exports = app;