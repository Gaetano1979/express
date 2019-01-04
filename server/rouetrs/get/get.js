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




module.exports = app;