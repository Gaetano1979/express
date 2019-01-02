const express = require('express');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 3000;

const mysql = require('./mysql/mysqlapp');

const queryapp = require('./mysql/query');

// creamos el cors para el sito de heroku
app.use(cors());

mysql.conessioneaperte();
mysql.stato();

app.get('/', (req, res) => {
    let pedir = queryapp.query('clientes');
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
app.get('/pagos', (req, res) => {

    let pedir = queryapp.query('pagos');
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




app.listen(port, () => {
    console.log('Servidor corriendo');

});