import { BuscarProductoBycodigo } from "../servicios/producto.service.js";
import { DbFactTemp } from "../db-data/dbFacturaPedidos.js";

/*Buscamos el producto que queremos añadir a la factura para obtener sus datos.
  si existe el producto lo agrega a la factura, de lo contrario lo crea en la base de dato
  como un producto nuevo y lo agrega a la lista de la factura.
*/

export function BuscarRegistroFactura() {
  let avocado;
  const codigo = document.getElementById('fact-cdgo');
  const cant = document.getElementById('fact-cant');
  const nombre = document.getElementById('fact-nom');
  const stock = document.getElementById('fact-stock');
  /*
    Añadimos un evento al input codigo para cargar los datos del producto
    a la factura.
  */
  codigo.addEventListener('input', () => {
    codigo.value = codigo.value.toUpperCase();
    let cdgo = '';
    cdgo += codigo.value;
    if (cdgo.length == 5) {
      avocado = BuscarProductoBycodigo(cdgo);
      if (avocado !== null) {

        nombre.value = avocado[1];
        stock.value = avocado[3];
      } else {
        //alert();
        const respuesta = confirm('Registro no existe, Deseas agregarlo a la based datos');
        if (respuesta) {
          nombre.value = prompt('Ingrese el Nombre');
        }
      }
    }
  });
}