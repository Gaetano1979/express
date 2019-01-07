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

app.use(cors());


// apriamo la conessione
mysql.conessioneaperte();

// =============================
// ruta get todos los clientes
// =============================
app.get('/clientes', (req, res) => {
    let pedir = querys.query('clientes');
    mysql.conessionequery(pedir, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }
    });
    console.log('todo bien');
    console.log(mysql.stato());
});

// =============================
// ruta get todos los clientes por id
// =============================
app.get('/cliente/:id', (req, res) => {
    let id_params = req.params.id;
    let pedir = querys.queryventas(id_params);
    mysql.conessionequery(pedir, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }
    });
    // mysql.conessionechiusa();
    console.log('todo bien');
    console.log(mysql.stato());
});

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
                data
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
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }
    });
    console.log('todo bien');
    console.log(mysql.stato());
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