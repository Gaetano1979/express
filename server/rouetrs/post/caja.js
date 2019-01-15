// import express from 'express';
const express = require('express');

const fs = require('fs');

const file = 'reibos.json';

// =============================
// declaramos el cors
// =============================
const cors = require('cors');
// =============================
// importamos las config de Mysql
// =============================
const mysql = require('../../../mysql/mysqlapp');

const { Recibo, Caja } = require('../../../classes/recibo');

// =============================
// importamos las config de las querys
// =============================
const querys = require('../../../mysql/query');

// const recibo = require('../../../classes/recibo.js');

// const rec = require('../../../data/recibo.json');

const app = express();
// =============================
// utilizamos el cors
// =============================
app.use(cors());


// ==============================
// Metodoo Post por la caja
// ==============================
app.post('/caja/:idfattura', (req, res) => {
    // id del parametro
    let idfatura = Number(req.params.idfattura);
    // creo una variable con los parametros del body
    let peticion = req.body;

    let tabla = 'caja';
    let tabla_pago = 'pagos';

    // creo un nuevo recibo de la clase Caja
    let caja = new Caja(peticion.ndoc, 'prova', peticion.entrada, 0, 'cliente', peticion.tarjeta, peticion.ref);

    let prima = mysql.conessione.query(`INSERT INTO ${tabla} SET ?`, caja, (err, result) => {
        if (err) {
            console.log(err);

        } else {
            let id_caja = result.insertId;
            let recibo = new Recibo(idfatura, peticion.entrada, peticion.responsable, peticion.ndoc, id_caja, null, peticion.cliente);


        }
    });

    let copiarecibo = fs.readFile('./server/rouetrs/post/copia.json', (err, data) => {
        if (err) throw err;
        return (JSON.parse(data));


    });

    console.log(copiarecibo);




    // fs.open('./server/rouetrs/post/copia.json', 'r', (err, fd) => {
    //     if (err) {
    //         if (err.code === 'ENOENT') {
    //             console.error('myfile does not exist');
    //             return;
    //         }

    //         throw err;
    //     }

    //     // readMyData(fd);
    //     console.log(fd.idcaja);

    // });







});



app.post('/pagos/recibos/:idfactura', (req, res) => {
    let id_fattura = req.params.idfactura;
    let peticion = req.body;
    let tabla = 'pagos';
    let documento = peticion.documento;
    let cantidad = peticion.cantidad;
    // let recibo = {
    //     idfactura: id_fattura,
    //     cantidad: peticion.cantidad,
    //     fecha: new Date(),
    //     responsable: peticion.responsable,
    //     documento: peticion.documento,
    //     idcaja: idcaja,
    //     idpago: null,
    //     paga_con: null,
    //     idcliente: null
    // };
    let reciboform = new Recibo(id_fattura, documento, cantidad);
    console.log(reciboform);


    res.send('todo bien');
});

module.exports = app;