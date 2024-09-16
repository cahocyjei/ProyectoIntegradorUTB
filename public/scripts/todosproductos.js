import { DbAvocados } from "../db-data/dbavocados.js";
import { INICIO } from "../utilidades/botoninicio.js";
const contenido = document.getElementById('contenido');
/**
 * @TodosProductos Esta función Carga todos los productos existentes en la base
 * de datos y los inyecta en index.html.
 */

export function TodosProductos() {

  const container_todos_Productos = document.querySelector('.container-todos-productos');

  const fila = document.createElement('div');
  const titulo = document.createElement('h1');
  titulo.textContent = 'Todos los productos';
  titulo.setAttribute('id', 'todos-p-ttlo');
  fila.setAttribute('class', 'row');  
  fila.setAttribute('id','tdp-row-col');

  const values = Object.values(DbAvocados);
  for (let j = 0; j < DbAvocados.length + 20; j++) {
    const col = document.createElement('div');
    col.setAttribute('class', 'col');
    col.setAttribute('id', 'tod-prod-col');
    const i_mg = document.createElement('img');
    i_mg.src = `${DbAvocados[3][j]}`;
    i_mg.setAttribute('alt', 'Avocado');
    i_mg.setAttribute('id', 'tdprod-img');
    const tdoprodttlo = document.createElement('h6');
    tdoprodttlo.setAttribute('class', 'tod-prod-title');
    tdoprodttlo.textContent = DbAvocados[1][j];
    col.appendChild(i_mg);
    col.appendChild(tdoprodttlo);
    fila.appendChild(col)
  }
  container_todos_Productos.appendChild(titulo)
  container_todos_Productos.appendChild(fila);
};
