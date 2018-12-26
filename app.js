const express = require('express');
const app = express();
// const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;

const { MysqlClass } = require('./mysql/mysql');

// app.use(path.resolve(express.static(path.join(__dirname, '../'))));


// creamos el cors para el sito de heroku
app.use(cors());


app.get('/', (req, res) => {
    let query = `
    select * from clientes`;
    MysqlClass.conessione();
    MysqlClass.resultado(query, (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            // console.log(res);
            res.json({
                data
            });
        }
    });
    MysqlClass.chiudere();
    console.log('todo bien');
});
app.get('/pagos', (req, res) => {
    let query = `
    select * from pagos`;
    MysqlClass.conessione();
    MysqlClass.resultado(query, (err, pagos) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                ok: true,
                data: pagos
            });
        }
    });
    MysqlClass.chiudere();
});
app.get('/ventas', (req, res) => {
    let query = `
        select * from ventas`;
    MysqlClass.conessione();
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
});
app.get('/ventas/:id', (req, res) => {
    // res.send('Bienvenidos a clientes');
    let id = req.params.id;
    let ventas = `
    select * from ventas where idcliente=${id}`;
    MysqlClass.conessione();
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
});

app.listen(port, () => {
    console.log('Servidor corriendo');

});