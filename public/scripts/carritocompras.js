import { Message } from "../message/message.js";
import { DatosCar } from "./datosCar.js";
import { dbCar } from "../db-data/dbCar.js";
//FUNCION QUE CREA UNA TABLA PARA LOS DATOS DE LA FACTURA CARRITO
export function CarritoCompras() {
  const containerHeader = document.querySelector('.container-header'); //Toma el elemento ubicado en el index.html para inyectar el contenido de la tabla;
  containerHeader.innerHTML = ' '; // Limpia los contenedores
  containerHeader.classList.toggle('my-clase');
  let subTotal = 0;
  let iva;
  let granTotal;
  //Metodo par convertir la moneda a formato colombiano.
  const valorEnMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  });
  //Recorremos la base de datos para sumar los totales de los precios.
  dbCar.forEach(sub => {
    subTotal += sub.total;
  });
  iva = parseFloat(subTotal * .16);
  granTotal = subTotal + iva;
  // Inyecta el carritocompras.html en el contenedor header
  fetch('componentes/carritocompras.html')
    .then(response => response.text())
    .then(data => {
      const containerFactura = document.querySelector('.container-factura-carrito');
      containerFactura.innerHTML = '';
      containerFactura.innerHTML = data;
    })
    .then(() => { //Maneja el asincronismo
      const carMessage = document.getElementById('car-message');
      const tBody = document.querySelector('.tbody-fact');
      let registro;
      if (dbCar.length > 0) { //Recorre la base de datos para obtener los registro del carro y llena la tabla.
        for (const avdo of dbCar) {
          const fila = document.createElement('tr');
          registro = Object.values(avdo);
          for (const reg of registro) {
            const td = document.createElement('td');
            td.textContent = reg;
            fila.appendChild(td);
          }
          tBody.appendChild(fila);
        }
        //Creamos las filas con la columnas de SubTotal, Iva y Gran Total.
        for (let i = 0; i < 3; i++) {
          const fila = document.createElement('tr'); //crea la fila
          for (let j = 0; j < 5; j++) { //inicia el bucle para llenar los campos de la primera fila
            //condición para llenar la fila SubTotal
            if (i == 0) { //Fila 1
              if (j == 0 || j == 1 || j == 2) {
                const td = document.createElement('td'); //campos vacios
                fila.appendChild(td);
              } else if (j == 3) {
                const td1 = document.createElement('td');
                td1.textContent = 'SubTotal'; //campo del texto SubTotal
                fila.appendChild(td1);
              } else if (j == 4) {
                const td2 = document.createElement('td');
                td2.textContent = valorEnMoneda.format(subTotal);// campo del valor SubTotal
                fila.appendChild(td2);
              }
              tBody.appendChild(fila);
            }
            //condición para llenar la fila Iva
            if (i == 1) { //Fila 2
              if (j == 0 || j == 1 || j == 2) {
                const td = document.createElement('td'); //campos vacios
                fila.appendChild(td);
              } else if (j == 3) {
                const td3 = document.createElement('td');
                td3.textContent = 'Iva 16%'; // campo del texto Iva
                fila.appendChild(td3);
              } else if (j == 4) {
                const td4 = document.createElement('td');
                td4.textContent = valorEnMoneda.format(iva); // campo del valor Iva
                fila.appendChild(td4);
              }
              tBody.appendChild(fila);
            }
            //condición para llenar la fila Gran Total
            if (i == 2) { //Fila
              if (j == 0 || j == 1 || j == 2) {
                const td = document.createElement('td'); //campos vacios
                fila.appendChild(td);
              } else if (j == 3) {
                const td4 = document.createElement('td');
                td4.textContent = 'TOTAL'; // campo del texto Iva
                fila.appendChild(td4);
              } else if (j == 4) {
                const td5 = document.createElement('td');
                td5.textContent = valorEnMoneda.format(granTotal); // campo del valor Iva
                fila.appendChild(td5);
              }
              tBody.appendChild(fila);
            }

          }
        }
      } else {
        carMessage.textContent = Message('Agregue productos al Carrito!!.');
      }
    })
    .catch(error => console.log('Error al Cargar el Documento')
    );


}
