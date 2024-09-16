const footerContainer = document.getElementById('footer');

export const Footer = () => {
  fetch('componentes/footer.html')
    .then(response => response.text())
    .then(data => {
      footerContainer.innerHTML = data;
    }).catch(error => console.log('Error Cargando el Archivo', error));
}