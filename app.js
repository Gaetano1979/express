const express = require('express');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 3000;

const { MysqlClass } = require('./mysql/mysql');

// importamos las query
const query = require('./mysql/query');

// creamos el cors para el sito de heroku
app.use(cors());
MysqlClass.conessione();



app.get('/', (req, res) => {
    MysqlClass.conessione();
    let queryget = query.query('clientes');
    MysqlClass.resultado(queryget, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                data
            });
        }
    });
    // MysqlClass.chiudere();
    console.log('todo bien');
});
app.get('/pagos', (req, res) => {
    MysqlClass.conessione();
    let querypago = query.query('pagos');
    MysqlClass.resultado(querypago, (err, pagos) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                ok: true,
                data: pagos
            });
        }
    });

});

app.get('/pagos/:id', (req, res) => {
    MysqlClass.conessione();
    let id_cliente = req.params.id;
    let query = `
    select * from pagos where idcliente=${id_cliente}`;
    MysqlClass.resultado(query, (err, resultado) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                ok: true,
                data: resultado
            });
        }
    });
    // MysqlClass.chiudere();
});
// con query dos tablas
app.get('/pagosDos/:id', (req, res) => {
    // MysqlClass.conessione();
    let id_cliente = req.params.id;
    let queryDos = query.queryJoin(id_cliente);
    MysqlClass.resultado(queryDos, (err, resultado) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                ok: true,
                data: resultado
            });
        }
    });
    // MysqlClass.chiudere();
});

app.get('/ventas', (req, res) => {
    MysqlClass.conessione();
    let query = `
        select * from ventas`;
    MysqlClass.resultado(query, (err, resultado) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                ok: true,
                data: resultado
            });
        }
    });
    // MysqlClass.chiudere();

});
app.get('/ventas/:id', (req, res) => {
    // res.send('Bienvenidos a clientes');
    MysqlClass.conessione();
    let id = req.params.id;
    let ventas = `
    select * from ventas where idcliente=${id}`;
    MysqlClass.resultado(ventas, (err, resul) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                ok: true,
                data: resul
            });
        }
    });
    // MysqlClass.chiudere();

});

app.listen(port, () => {
    console.log('Servidor corriendo');

});