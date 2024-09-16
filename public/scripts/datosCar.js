import { DbAvocados } from "../db-data/dbavocados.js";
import { dbCar } from "../db-data/dbCar.js"

/* Esta función añade un regisro a la base de datos del carrito de compras
  recibe un parametro con la cantidad de productos, verifica que exista el 
  producto en la base de datos y tambien su stock. Incrementa la cantidad
  de cada registro, del producto.
*/
export function DatosCar() {
  let idAvo;
  let avocado;
  let newReg;
  let new_nombre;
  let new_precio;
  let index = 0;
  let stock = 0;
  let active = false;
  const sku = document.getElementById('sku'); //Accede al elemento con el id sku
  idAvo = sku.textContent //.slice(5, 6); //Saca el id de la cadena string.
  const idCant = document.getElementById('cant');; //Accede al elemento con la clase .count-car
  const upStock = document.getElementById('stock');
  let cant = parseInt(idCant.value);

  //Verifica que exista el producto en la base de datos de productos
  for (let i = 0; i < DbAvocados[0][0].length; i++) {
    if (idAvo == DbAvocados[0][0][i]) {
      new_nombre = DbAvocados[1][i];
      new_precio = DbAvocados[0][1][i];
      stock = DbAvocados[0][2][i];
      index = i;
      break;
    }
  };

  //if (stock < cant && cant >= stock) {
  //}else{
  //  alert('La cantidad no puede ser mayor al stock: ', stock);
  //} 
  //Si el stock es mayor a cero, entonces:
  if (stock > 0) {
    //Si la base de datos del carro de compras tiene registros, entonces:
    //Si el registro existe, entonces modifica la cantidad.
    if (dbCar.length > 0) {
      for (let j = 0; j < dbCar.length; j++) {
        if (idAvo == dbCar[j].id) {
          dbCar[j].cantidad = dbCar[j].cantidad + cant;
          active = true; //Activa el productos
          break;
        }
      }
    }
    // Si no existe el registro en dbCar, lo crea y  lo añade a dbCar
    if (!active) {
      newReg = {
        id: idAvo,
        nombre: new_nombre,
        cantidad: cant,
        precio: new_precio,
        total: parseInt(cant) * parseInt(new_precio)
      }
      dbCar.push(newReg);
    }
    for (let k = 0; k < DbAvocados[0][0].length - 1; k++) {
      if (idAvo == DbAvocados[0][0][k]) {
        const newStock = DbAvocados[0][2][index] - cant;
        DbAvocados[0][2][index] = newStock;
        upStock.textContent = '';
        upStock.textContent = newStock;
        break;
      }
    }
  } else {
    alert('Producto Agotado');
  } 
}