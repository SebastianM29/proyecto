const ventas = document.querySelector('.venta')
const sinstock = document.querySelector('.sinStock')


const noHayStock = JSON.parse(localStorage.getItem('noproducts'))
const respprod = JSON.parse(localStorage.getItem('products'))
console.log(respprod);
respprod.forEach(element => {
    const div = document.createElement('div')
    div.classList= 'ventasProducto'
    div.innerHTML= `
    <p>Categoria: ${element.categoria} , titulo:${element.titulo} , cantidad: ${element.cantidad} , precio unitario: ${element.precio}, total: ${element.total}</p>
 
    `



    console.log('entra?');
  
 
    ventas.appendChild(div)
    
});
noHayStock.forEach(element => {
    const div = document.createElement('div')
    div.classList= 'sinProducto'
    div.innerHTML= `
    
    <p>Categoria: ${element.categoria} , titulo:${element.titulo} , cantidad: ${element.cantidad} , precio unitario: ${element.precio}</p>
 
    `



    console.log('entra?');
  
 
    sinstock.appendChild(div)
    
});

localStorage.removeItem('products')
localStorage.removeItem('noproducts')