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










module.exports = app;