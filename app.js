const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { MysqlClass } = require('./mysql/mysql');
let query = `
    select idcliente,cliente from clientes`;
let query1 = `
describe clientes`;
let query2 = `
 SHOW TABLES;
`;
let pagos = `select * from pagos`;
let rel = `
SELECT clientes.cliente, pagos.idcliente FROM pagos JOIN pagos_clientes
ON (clientes.idclientes = pagos_clientes.cliente) JOIN pagos
ON (pagos.idpago = pagos_cliente.pagos)`;
let pro = `
select clientes.idcliente,pagos.idcliente from pagos where idcliente=pagos.idcliente`;





app.get('/', (req, res) => {
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
    MysqlClass.conessione();
    MysqlClass.resultado(pagos, (err, pagos) => {
        if (err) {
            console.log(err);
        } else {
            console.log(query);
            console.log(res.json());

            // res.json({
            //     ok: true,
            //     data: pagos
            // });
        }
    });
    MysqlClass.chiudere();
});
app.get('/clientes', (req, res) => {
    // res.send('Bienvenidos a clientes');
    MysqlClass.resultado(query, (err, resul) => {
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