let query = (tabla) => {
    let resultado = `select * from ${tabla}`;
    return resultado;
};

let querybuscar = (tabla, columna, termino) => {
    let resultado = `SELECT * FROM ${tabla} WHERE ${columna} LIKE '%${termino}%'`;
    // return console.log(resultado);
    return resultado;

};

let queryWhere = (tabla, indicewhere, valorwhere) => {
    let resultado = `select * from ${tabla} where ${indicewhere}=${valorwhere} `;
    return resultado;
};

let queryJoin = (idcliente) => {
    let resultado = `
    SELECT ventas.idcliente,ventas.documento,ventas.tipodoc,ventas.fecha,ventas.total,ventas.idcaja,pagos.cantidad,pagos.fecha_pag,pagos.responsable FROM ventas left join pagos on ventas.idfactura=pagos.idfactura where ventas.idcliente=${idcliente}`;
    // return console.log(resultado);
    return resultado;
};

let querytotalPagos = (idfactura, columna) => {
    let resultado = `
    select sum(${columna}) from pagos where pagos.idfactura=${idfactura}`;
    // console.log(resultado);
    return resultado;
};

let queryventas = (idcliente) => {
    let resultado = `select * from ventas where ventas.idcliente=${idcliente} order by ventas.fecha desc`;
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