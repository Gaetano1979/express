const recibos = {

    documento: {
        type: String,
        require: [true, 'numero obigatorio']
    },
    fecha: {
        type: Date,
        require: [true, 'data obligatoria']
    },
    concepto: {

    },
    entrada: {

    },
    salida: {

    },
    moneda: 'S/',



}

module.exports = {
    recibos
}