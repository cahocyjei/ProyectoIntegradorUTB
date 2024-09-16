import { DbAvocados } from "../db-data/dbavocados.js";
import { DatosCar } from "./datosCar.js";
const headerContenido = document.querySelector('.container-header');
const contenidoProductos = document.getElementById('contenido');
const ttlo = document.getElementById('ttlo');

const valorEnMoneda = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP'
});

export function Detail(nombre) {
  let skuAvo;
  let nombreAvo;
  let avoImg;
  let precioAvo;
  let stockAvo;
  let descripAvo;
  let str;

  for (let i = 0; i < DbAvocados.length - 1; i++) {
    if (nombre == DbAvocados[1][i]) {
      skuAvo = DbAvocados[0][0][i];
      nombreAvo = DbAvocados[1][i];
      avoImg = DbAvocados[3][i];
      precioAvo = DbAvocados[0][1][i];
      stockAvo = DbAvocados[0][2][i];
      descripAvo = DbAvocados[4][i];
      break;
    }
  }
  if (descripAvo.length > 400) {
    str = descripAvo.slice(0, 400);
  } else {
    str = descripAvo;
  }
  fetch('componentes/detail.html')
    .then(response => response.text())
    .then((data) => {
      contenidoProductos.innerHTML = ' ';
      contenidoProductos.style.border = '0px'
      headerContenido.innerHTML = data;
    })
    .then(() => {
      const id_img = document.getElementById('id-img');
      const sku = document.getElementById('sku');
      const nombre = document.getElementById('nombre');
      const precio = document.getElementById('precio');
      const stock = document.getElementById('stock');
      const descrip = document.getElementById('pdescrip');

      id_img.src = avoImg;
      sku.textContent = skuAvo;
      nombre.textContent = nombreAvo;
      precio.textContent = valorEnMoneda.format(precioAvo);
      stock.textContent = stockAvo;
      descrip.textContent = str;

      //Cantidad añadida al contador del carro
      const counterAvocado = document.querySelector('.count-car'); //Contador
      const adcar = document.getElementById('ad-car'); //Añadir al carrito
      const idCant = document.getElementById('cant');
      adcar.addEventListener('click', () => {
        const msgProduct = document.getElementById('msge-prod');
        msgProduct.textContent = '';
        msgProduct.textContent = 'Producto Añadido al Carro'
        const cant = parseInt(idCant.value);
        counterAvocado.textContent = parseInt(counterAvocado.textContent) + cant;
        DatosCar();
      })

    })
}