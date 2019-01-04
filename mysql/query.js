let query = (tabla) => {
    let resultado = `select * from ${tabla}`;
    return resultado;
};

let querybuscar = (tabla, columna, termino) => {
    let resultado = `SELECT * FROM ${tabla} WHERE ${columna} LIKE '%${termino}%'`;
    // return console.log(resultado);
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

let querytotalPagos = (idfactura, pagos) => {
    let resultado = `
    select sum(${pagos}) from pagos where pagos.idfactura=${idfactura}`;
    // console.log(resultado);
    return resultado;
};

let queryventas = (idcliente) => {
    let resultado = `select * from ventas where ventas.idcliente=${idcliente}`;
    return resultado;
};

let querypagos



module.exports = {
    query,
    queryWhere,
    queryJoin,
    querytotalPagos,
    querybuscar,
    queryventas
};