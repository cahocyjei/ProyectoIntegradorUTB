const header = document.querySelector('.container-header');
/**
 * @Header Esta función utiliza el método fecht para llamar
 * el bloque de html que contiene el header, para inyectarlo en
 * el index.html.
 */
export function Header() {
  fetch('componentes/header.html')
  .then(response => response.text())
  .then(data => {
    header.innerHTML = data;
  }).catch(error => console.log('Error Cargando el Archivo', error));
}