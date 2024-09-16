import { Productos } from './scripts/productos.js';
import { Detail } from './scripts/detail.js';
import { Footer } from './scripts/footer.js';
import { Header } from './scripts/header.js';
import { CarritoCompras } from './scripts/carritocompras.js';
import { PedidoProveedor } from './scripts/pedido.proveedor.js';
import { TodosProductos } from './scripts/todosproductos.js';
import { INICIO } from './utilidades/botoninicio.js';
Header();
Footer();
Productos();
TodosProductos();

document.addEventListener('DOMContentLoaded', () => {
  //Muestra la factura del carrito de compras

  const carritoCompras = document.getElementById('car');
  carritoCompras.addEventListener('click', ()=>{
    CarritoCompras();
  })
  //Muestra todos los productos
  const prdto = document.getElementById('prdto');
  const pd_proveedor = document.getElementById('pd-proveedor');
  prdto.addEventListener('click', () => {
    TodosProductos();
  });

  //Despliega el formulario de pedidos al proveedor
  pd_proveedor.addEventListener('click', () => {
    PedidoProveedor();
  })

  const btnInicio = document.getElementById('inicio');
  btnInicio.addEventListener('click', () => {
    INICIO()
  });

});