const ventas = document.querySelector('.venta')
const sinstock = document.querySelector('.sinStock')


const noHayStock = JSON.parse(localStorage.getItem('noproducts'))
const respprod = JSON.parse(localStorage.getItem('products'))
console.log(respprod);
respprod.forEach(element => {
    const div = document.createElement('div')
    div.classList= 'ventasProducto'
    div.innerHTML= `
    <h4>Categoria: ${element.categoria} , titulo:${element.titulo} , cantidad: ${element.cantidad} , precio unitario: ${element.precio}, total: ${element.total}</h4>
 
    `



    console.log('entra?');
  
 
    ventas.appendChild(div)

    const h1Element = document.querySelector('h1.oculto');
    
    if (h1Element) {
        h1Element.classList.remove('oculto');
    }
    
});
noHayStock.forEach(element => {
    const div = document.createElement('div')
    div.classList= 'sinProducto'
    div.innerHTML= `

    <p><strong>Sin stock suficiente: </strong>Categoria: ${element.categoria} , titulo:${element.titulo} , cantidad: ${element.cantidad}</p>
 
    `



    console.log('entra?');
  
 
    sinstock.appendChild(div)
    
});

localStorage.removeItem('products')
localStorage.removeItem('noproducts')