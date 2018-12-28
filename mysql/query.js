let query = (tabla) => {
    let resultado = `select * from ${tabla} limit 50 `;
    return resultado;
};

let queryWhere = (tabla, indice, valorIndice) => {
    let resultado = `select * from ${tabla} where ${indice}=${valorIndice} `;
    return resultado;
};

let queryJoin = (idcliente) => {
    let resultado = `
    SELECT ventas.idcliente,ventas.documento,ventas.tipodoc,ventas.fecha,ventas.total,ventas.idcaja,pagos.cantidad,pagos.fecha_pag,pagos.responsable FROM ventas left join pagos on ventas.idfactura=pagos.idfactura where ventas.idcliente=${idcliente}`;
    // return console.log(resultado);
    return resultado;
};



module.exports = {
    query,
    queryWhere,
    queryJoin
};