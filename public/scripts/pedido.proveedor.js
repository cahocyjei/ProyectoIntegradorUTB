import { DbAvocados } from "../db-data/dbavocados.js";
import { DbFactTemp } from "../db-data/dbFacturaPedidos.js"
import { DbFacturaPedido } from "../db-data/dbFacturaPedidos.js"
import { BuscarRegistroFactura } from "../servicios/factura.service.js";
import { BuscarProductoBycodigo } from "../servicios/producto.service.js"
import { NUMEROPEDIDO } from "../utilidades/numero.pedido.js"


/**
   @PedidoProveedor Función que crea un formulario para hacer los respectivos
   pedidos a los proveedores.
   */

export function PedidoProveedor() {

  //Carga el componente pedido.proveedor.html en el header
  fetch('componentes/pedido.proveedor.html')
    .then(response => response.text())
    .then((data) => {
      const header_contentenido = document.querySelector('.container-header');
      const containerPedidoProv = document.querySelector('.container-pedido-proveedor');
      const contenido = document.getElementById('contenido');
      const containerTodosProd = document.querySelector('.container-todos-productos');
      containerTodosProd.innerHTML = '';
      contenido.innerHTML = '';
      header_contentenido.innerHTML = '';
      containerPedidoProv.innerHTML = data;
    })
    .then(() => {
      const listProdFact = document.querySelector('.pd-list-prod-container');
      const num_pedido = document.getElementById('pd-num-pedido');
      const fila = document.getElementById('pd-fila');
      const dia = document.getElementById('dia');
      const mes = document.getElementById('mes');
      const año = document.getElementById('año');
      dia.disabled = true;
      mes.disabled = true;
      año.disabled = true;
      num_pedido.disabled = true;
      const date = new Date();
      dia.value = date.getDay();
      mes.value = date.getMonth();
      año.value = date.getFullYear();

      //Carga el Número del pedido:
      num_pedido.value = NUMEROPEDIDO();

      //Lista de productos
      for (let j = 0; j < DbAvocados.length + 10; j++) {
        const nombre = document.createElement('h6');
        const cdgo = document.createElement('span');
        cdgo.setAttribute('id', 'pd-cdgo-list');
        nombre.setAttribute('id', 'pd-nom-prod');
        const contProd = document.createElement('div');
        contProd.setAttribute('id', 'pd-prov-content');
        const i_mg = document.createElement('img');
        i_mg.setAttribute('alt', 'Avocado');
        i_mg.setAttribute('id', 'pd-prov-img');
        i_mg.src = `${DbAvocados[3][j]}`;
        nombre.textContent = DbAvocados[1][j];
        cdgo.textContent = DbAvocados[0][0][j];
        contProd.appendChild(nombre);
        contProd.appendChild(i_mg)
        contProd.appendChild(cdgo);
        fila.appendChild(contProd);
      }
      listProdFact.appendChild(fila);
    })
    .then(() => {
      /*Añadimos un evento listener al boton Ad-Fact de la factura de pedidos
        para que añada los datos a la factura llamando la funcion AñadirDatosFacturaPedido.
      */
      const añadirProdFact = document.getElementById('ad-fact');
      añadirProdFact.addEventListener('click', () => {
        AñadirDatosFacturaPedido();
      })
      BuscarRegistroFactura();
    })
}

export function AñadirDatosFacturaPedido() {
  let totalFactura = 0;
  let ttalCant = 0;
  let values;
  let estado = false;
  let index;

  const tbodyFact = document.getElementById('t-body-fact');
  const cant = document.getElementById('fact-cant');
  const totalFact = document.getElementById('total-fact');
  const ttalCantidad = document.getElementById('ttal-cant');
  const codigo = document.getElementById('fact-cdgo');
  const nombre = document.getElementById('fact-nom');
  const stock = document.getElementById('fact-stock');
  const pd_enviar = document.getElementById('pd-enviar');

  const valorEnMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  });

  /**Ahora recorremos la base de datos y añadimos los datos
  a la factura de pedidos de la interfaz.
  */

  const limpiarDatos = () => {
    codigo.value = '';
    nombre.value = '';
    stock.value = '';
    cant.value = 0;
  }
  const producto = BuscarProductoBycodigo(codigo.value);

  pd_enviar.addEventListener('click', () => {
    limpiarDatos();
    const num_pedido = document.getElementById('pd-num-pedido');
    num_pedido.value = NUMEROPEDIDO();
    ttalCantidad.textContent = '';
    totalFact.textContent = '';
    tbodyFact.innerHTML = '';
  })

  if (cant.value !== '0') { //Esta condición verifica que haya digitado la cantidad.
    /*
      Si la base de datos contiene registros, verifica que haya
      registros iguales para modificar su cantidad y asi no 
      agregar productos repetidos.
    */
    for (let i = 0; i < DbFactTemp.length; i++) {
      if (codigo.value == DbFactTemp[i].id) {
        index = i;
        estado = true; //Verifica si el producto esta repetido.
        break;
      }
    }

    if (DbFactTemp.length == 0 || !estado) {
      const reg = {
        id: codigo.value,
        nombre: nombre.value,
        cantidad: parseInt(cant.value),
        stock: stock.value,
        precio: producto[2],
        total: producto[2] * parseInt(cant.value),
      }
      DbFactTemp.push(reg);
      limpiarDatos();
      console.log(DbFactTemp);
    } else if (DbFactTemp.length > 0 && estado) {
      DbFactTemp[index].cantidad = DbFactTemp[index].cantidad + parseInt(cant.value);
      DbFactTemp[index].total = DbFactTemp[index].precio * DbFactTemp[index].cantidad;
      limpiarDatos();
      console.log(DbFactTemp);
    }
    console.log('Datos db: ', DbFactTemp.length);

    /*
      Añadimos los registros a la factura de la interfaz
    */
    tbodyFact.innerHTML = '';
    for (const fact of DbFactTemp) {
      const fila = document.createElement('tr');
      totalFactura += fact.total;
      ttalCant += parseInt(fact.cantidad);
      values = Object.values(fact);
      for (const dato of values) {
        const td = document.createElement('td');
        td.textContent = dato;
        fila.appendChild(td);

      }
      tbodyFact.appendChild(fila);
      ttalCantidad.textContent = ttalCant;
      totalFact.textContent = valorEnMoneda.format(totalFactura);
    }
  } else {
    alert('Introduzca la Cantidad a pedir');
  }
}