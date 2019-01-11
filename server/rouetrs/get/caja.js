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


//metodos post
app.post('/caja/:idfattura', (req, res) => {
    let idfatura = req.params.idfattura;

    let peticion = req.body;
    let fecha = new Date();
    let tabla = 'caja';
    let recibo = {
        documento: peticion.ndoc,
        fecha,
        // concepto: peticion.concepto,
        entrada: peticion.entrada,
        salida: peticion.salida,
        moneda: "S/.",
        turno: 1,
        local: 1,
        num_caja: 1,
        usuario: peticion.usuario,
        destino_origen: peticion.destino,
        tarjeta: peticion.tarjeta,
        ref_tarjeta: peticion.ref
    };
    if (recibo.documento === 'FV.') {
        recibo.concepto = 'VENTA';
    } else {
        recibo.concepto = 'pago a Cuenta';
    }

    let querypost = mysql.conessione.query(`INSERT INTO ${tabla} SET ?`, recibo, (error, results) => {
        if (error) {
            console.log(error.sqlMessage);

        } else {
            res.json({
                id_caja: results.insertId,
                riga_inserita: results.affectedRows
            });
        }

        console.log('id caja', Number(results.insertId));
    });
    console.log(querypost.sql);
});



module.exports = app;