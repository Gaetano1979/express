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

const router = express.Router();
// =============================
// utilizamos el cors
// =============================
app.use(cors());


app.get('/prova/prova/:id', (req, res, next) => {
    let id = req.params.id;

    mysql.conessione.query(`select * from ventas where idcliente=${id} `, (err, resultado) => {


        getfattura(resultado, (err, arreglo) => {
            if (err) {
                res.json({
                    Errore: err
                });
            } else {

                res.json({
                    resultado: arreglo

                });

            }

        });
    });
});
app.get('/proviamo/dos/:id', (req, res) => {
    let id = req.params.id;
    proviamoQuery(id, (err, respuesta) => {
        if (err) {
            res.json({
                err
            });
        } else {
            res.json({
                respuesta
            });
        }
    });

});


let getfattura = (arreglo, callback) => {

    let prova = [];
    for (let i = 0; i < arreglo.length; i++) {
        id = {
            id: arreglo[i].idfactura,
            total: arreglo[i].total
        };
        prova.push(id);
    }
    if (prova.length === 0) {
        return callback('El cliente no tiene facturas a su nombre');
    } else {
        return callback(null, prova);
    }
}


let prova = require('../../../data/fatturas.json');
let prova2 = require('../../../data/prova.json');

let provaFor = (arreglo1, arreglo2, callback) => {
    if (arreglo1.length === 0) {
        return callback('El primer arreglo  está vacio');
    }
    if (arreglo2.length === 0) {
        return callback('El segundo arreglo está vacio');
    }

    arreglo1.forEach(element => {

        let pagamenti = 0;
        let recibos = [];

        arreglo2.find(pagos => {

            if (pagos.idfactura === element.id) {
                pagamenti += pagos.cantidad;
                let ob = {
                    pago: pagos.cantidad
                };
                recibos.push(ob);
            }
        });
        // console.log('========todos los pagos=====', recibos);
        // console.log('=====pagamenti=======', pagamenti);
        // console.log('=====totale factura======', element.total);
        let documento = {
            Recibos: recibos,
            Cancelado: pagamenti,
            Total: element.total
        };
        return callback(null, documento);

    });
};
provaFor(prova, prova2, (err, resultado) => {
    console.log(resultado, 'resultado');

});

let proviamoQuery = (id, callback) => {

    mysql.conessione.query(`select * from ventas where idcliente=${id} `, (err, resultado) => {
        if (resultado == 0) {
            return callback('no hay ventas por este cliente');
        } else {

            mysql.conessione.query(`select * from pagos where idcliente=${id} `, (err, primitivo) => {

                let arrDoc = [];
                let Doc;

                resultado.forEach(element => {
                    let pagamenti = 0;
                    let recibos = [];

                    primitivo.find(pagos => {

                        if (pagos.idfactura === element.idfactura) {
                            pagamenti += pagos.cantidad;
                            let ob = {
                                pago: pagos.cantidad
                            };
                            recibos.push(ob);
                        }
                    });
                    Doc = {
                        Recibos: recibos,
                        Cancelado: pagamenti,
                        Total_Factura: element.total
                    }

                    arrDoc.push(Doc)



                });

                if (primitivo.length === 0) {
                    return callback('no hay cobranza por este cliente')
                } else {
                    return callback(null, arrDoc);

                }
            });
        }
    });


};
proviamoQuery(6, (err, resultado) => {
    if (err) {
        console.log(err);

    } else {
        console.log(resultado, 'resultado');

    }


});












module.exports = app;