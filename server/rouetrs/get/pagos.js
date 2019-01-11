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

const Recibo = require('../../../models/recibos.js');

const app = express();
// =============================
// utilizamos el cors
// =============================
app.use(cors());


// ==============================
// rutas de todos los pagos
// ==============================
app.get('/pagos/clientes/:id', (req, res) => {
    let id_cliente = req.params.id;
    let tabla = 'pagos';
    let indice = 'idcliente';
    let pedir = querys.queryWhere(tabla, indice, id_cliente);
    mysql.conessionequery(pedir, (err, data) => {
        // console.log(data);
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }

    });
});

// =============================
// ruta get lista pagos por factura
// =============================
app.get('/recibos/:id', (req, res) => {
    // let pedir = querys.query('pagos');
    let id_par = req.params.id;
    let tabla = 'pagos';
    let columnapagos = 'idfactura';
    let pedir = querys.queryWhere(tabla, columnapagos, id_par);
    mysql.conessionequery(pedir, (err, data) => {
        let pagos = 0;
        for (let index = 0; index < data.length; index++) {
            const element = data[index].cantidad;
            console.log(element);
            pagos = pagos + element;
            console.log(pagos, 'pagamenti');
        }
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data,
                pagos
            });
        }
    });
    console.log('todo bien');
    console.log(mysql.stato());
    // console.log(pagos);

});






module.exports = app;