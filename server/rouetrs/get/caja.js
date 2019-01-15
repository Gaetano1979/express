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

// const Recibo = require('../../../models/recibos.js');

const app = express();
// =============================
// utilizamos el cors
// =============================
app.use(cors());



app.get('/caja/:documento', (req, res) => {
    let documento = req.params.documento;
    let tabla = req.body.tabla;
    let indiceWhere = req.body.indice;
    let pedir = querys.queryWhere(tabla, indiceWhere, documento);
    mysql.conessionequery(pedir, (err, data) => {

        if (err) {
            console.log('error', err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }
    });
    console.log('todo bien');
});





module.exports = app;