 const fs = require('fs');


 class Caja {
     constructor(documento, concepto, entrada, salida, destino, tarjeta, ref) {
         //  this.idcaja = null;
         this.documento = documento;
         this.fecha = new Date();
         this.concepto = concepto;
         this.entrada = entrada;
         this.salida = salida;
         this.moneda = "S/.";
         this.turno = 1;
         this.local = 1;
         this.num_caja = 1;
         this.usuario = 'Admin';
         this.destino_origen = destino;
         this.tarjeta = tarjeta;
         this.ref_tarjeta = ref;
     }

 }


 class Recibo {
     constructor(idfactura, cantidad, responsable, documento, idcaja, pago_con, idcliente) {
         this.idfactura = idfactura;
         this.cantidad = cantidad;
         this.fecha = new Date();
         this.responsable = responsable;
         this.documento = documento;
         this.idcaja = idcaja;
         //  this.idpago = idpago;
         this.paga_con = pago_con;
         this.idcliente = idcliente;


         this.guardar();

         console.log('Recibo listo');
     }

     guardar() {
         let data = {
             documento: this.documento,
             cantidad: this.cantidad,
             fecha: this.fecha,
             idcaja: this.idcaja
         };

         let datajson = JSON.stringify(data);

         fs.writeFileSync('./data/recibos.json', datajson);
         fs.writeFileSync('./server/rouetrs/post/copia.json', datajson, (err) => {
             if (err) throw err;
             console.log('The file has been saved!');
         });
     }

 }
 module.exports = {
     Recibo,
     Caja
 };