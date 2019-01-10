// =============================
//importamos express
// =============================
const express = require('express');


// =============================
// importamos las config de Mysql
// =============================
const mysql = require('../../../mysql/mysqlapp');

// =============================
// importamos las config de las querys
// =============================
const querys = require('../../../mysql/query');

// =============================
// declaramos la app con express
// =============================
const app = express();

// =============================
// declaramos el cors
// =============================
const cors = require('cors');

// =============================
// utilizamos el cors
// =============================
app.use(cors());

// =============================
// ruta get suma total  por factura
// =============================
app.get('/pagos/:id', (req, res) => {
    // let pedir = querys.query('pagos');
    let id_par = req.params.id;
    let columnapagos = 'cantidad';
    let pedir = querys.querytotalPagos(id_par, columnapagos);
    mysql.conessionequery(pedir, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data: data[0]
            });
        }
    });
    console.log('todo bien');
    console.log(mysql.stato());
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

// =============================
// ruta get para buscar un cliente
// =============================
app.get('/buscar', (req, res) => {
    // creamos una variable que lee los parametros por la req
    let datos = req.headers;
    // creamos la variable que deberia recibir 
    let termino = datos.termino;

    let peticion = querys.querybuscar('clientes', 'cliente', termino);

    mysql.conessionequery(peticion, (err, data) => {
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






module.exports = app;