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

const app = express();
// =============================
// utilizamos el cors
// =============================
app.use(cors());


app.get('/', (req, res) => {
    res.json('Todo bien');
    console.log('Todo Bien');
});

// ===============================
// get de todas las tablas de las base de datos
// ===============================
app.get('/tablas', (req, res) => {
    let peticion = querys.tablas();
    mysql.conessionequery(peticion, (err, tablas) => {


        if (err) {
            console.log('Error', err);
            res.send(err);
        } else {
            res.json({
                // tabla: tablas[0].Tables_in_sistematic_net
                tablas
            });
        }
    })
})

// ===============================
// servicio get de cualquier tablas, solo especificar en parametro la tabla
// ===============================
app.get('/:lista', (req, res) => {
    let lista_par = req.params.lista;
    let peticion = querys.query(lista_par);
    mysql.conessionequery(peticion, (err, data) => {
        if (err) {
            console.log('Error', err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }
    });
});


// =============================
// ruta get cliente por id cliente
// =============================
app.get('/cliente/:id', (req, res) => {
    let id_cliente = req.params.id;
    let tabla = 'clientes';
    let indiceWhere = 'clientes.idcliente';
    let peticion = querys.queryWhere(tabla, indiceWhere, id_cliente);
    mysql.conessionequery(peticion, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data: data[0]
            });
        }
    });
    console.log(`Todo bien peticion ${peticion}`);

});



// =============================
// ruta get facturas por id cliente
// =============================
app.get('/facturas/:id', (req, res) => {
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

    console.log('todo bien');
    console.log(mysql.stato());
});

// =============================
// ruta get para buscar un cliente
// =============================
app.get('/buscar/cliente', (req, res) => {
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