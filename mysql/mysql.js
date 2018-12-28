const Mysql = require('mysql');

let conessione;


let MysqlClass = {
    hostClass: 'ls-4ced6077d7519bffb5de949e2bae2dcbe3615210.c5s20s1vsvjo.eu-central-1.rds.amazonaws.com',
    password: 'gaetano1979',
    user: 'dbmasteruser',
    database: 'sistematic_net',
    conessione: () => {
        conessione = Mysql.createConnection({
            host: MysqlClass.hostClass,
            password: MysqlClass.password,
            user: MysqlClass.user,
            database: MysqlClass.database
        });

        conessione.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Conessione eseguita con successo');
            }
        });
        conessione.end((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Conessione chiusa');
            }
        })
    },
    chiudere: () => {
        conessione.end((err) => {
            if (err) {
                console.log(err);

            } else {
                console.log('Conessione Chiusa');
            }
        });
    },
    resultado: (queryresultado, callback) => {
        let conessione = Mysql.createConnection({
            host: MysqlClass.hostClass,
            password: MysqlClass.password,
            user: MysqlClass.user,
            database: MysqlClass.database
        });
        conessione.query(queryresultado, (err, resultado) => {
            console.log(queryresultado);
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (resultado.length === 0) {
                return callback('Registro no encontrado');

            } else {
                // console.log('resultati', resultado);
                console.log('resultados enviados');

                return callback(null, resultado);
            }
        });
    }
};
module.exports = { MysqlClass };