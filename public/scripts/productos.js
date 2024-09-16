import { DbAvocados } from '../db-data/dbavocados.js'
import { Detail } from './detail.js';
//const fila = document.getElementById('fila');
const containerProductos = document.getElementById('contenido');
/**
 * @Productos Esta función crea filas para mostrar los productos
   que se encuentran en la base de datos, tres productos por fila.
   cada producto muestra la imagen y el nombre.
   Para esto crea las filas con document.create al igual que las columnas
   para posteriormente inyectarlas en el index.html.
 */

   
export function Productos() {
  const titulo = document.createElement('h1');
  titulo.setAttribute('id', 'ttlo');
  titulo.textContent = 'Lo más pedido';
  const divContainer = document.createElement('div');
  divContainer.setAttribute('id', 'divContainer');
  const fila = document.createElement('row')
  fila.setAttribute('class', 'row g-3');
  fila.setAttribute('id', 'fila');
  //containerProductos.insertBefore(titulo, containerProductos.firstChild);
  for (let j = 0; j < DbAvocados.length - 2; j++) {
    const col = document.createElement('col');
    col.setAttribute('class', 'col-4 lomas-ped');
    col.setAttribute('id', 'prod-col')
    const i_mg = document.createElement('img');
    i_mg.setAttribute('id', 'prod-img')
    i_mg.src = `${DbAvocados[3][j]}`;
    i_mg.setAttribute('alt', 'Avocado');
    const cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.textContent = DbAvocados[1][j];
    col.appendChild(i_mg);
    col.appendChild(cardTitle);
    fila.appendChild(col)
  }
  divContainer.appendChild(titulo);
  divContainer.appendChild(fila);
  containerProductos.appendChild(divContainer);
  

  const columnas = document.querySelectorAll('.lomas-ped');
  columnas.forEach((columna) => {
    columna.addEventListener('click', () => {
      const cardtitle = columna.querySelector('.card-title')
      const nombre = cardtitle.textContent;
      Detail(nombre);
    })
  });
}