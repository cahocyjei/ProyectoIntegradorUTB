import { Header } from "../scripts/header.js";
import { Productos } from "../scripts/productos.js";
import { TodosProductos } from "../scripts/todosproductos.js";
/**
 * @INICIO Esta función navega hacia la pagina principal y muestra el
 * contenido haciendo click en el boton inicio del navbar.
 */
export function INICIO() {
  //Reinicia la pagina y recarga los productos

  const containerHeader = document.querySelector('.container-header');
  containerHeader.innerHTML = '';
  Header();
  const containerFacturCarrito = document.querySelector('.container-factura-carrito')
  containerFacturCarrito.innerHTML = '';
  const containerProductos = document.querySelector('.container-productos');
  containerProductos.innerHTML = '';
  Productos();
  const containerPedidoProv = document.querySelector('.container-pedido-proveedor');
  containerPedidoProv.innerHTML = '';
  const containerTodosProductos = document.querySelector('.container-todos-productos');
  containerTodosProductos.innerHTML = '';
  TodosProductos();
}