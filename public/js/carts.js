



const eject = async() => {

    const respprod = JSON.parse(localStorage.getItem('products'))

    console.log(respprod)
    const id = document.getElementById('prid')
    const valor = id.dataset.id
    console.log('debo ver el valor',valor)
    const carritos = document.querySelector('.carritos')
    carritos.innerHTML=''
    respprod.forEach(element => {
        console.log(element)
        const div = document.createElement('div')
        div.classList= 'viewsCart'
        div.innerHTML= `
        <p><strong>Categoría: </strong>${element.categoria}</p>
        <p><strong>Titulo: </strong>${element.titulo}</p>
        <p><strong>Descripcion: </strong>${element.descripcion}</p>
        <p><strong>Precio: </strong>${element.precio}</p>
        <p><strong>Codigo: </strong>${element.codigo}</p>
        <p><strong>Stock: </strong>${element.cantidad}</p>
        `
        carritos.appendChild(div)
        
    });


     const resp = await fetch(`/carts/${valor}`)
     if (resp.ok) {
        const res =await resp.json()
        console.log( 'este es el array?',res)
       
        // const resCarr = res.products
      

    }else{
         const res =await resp.json()
         console.log('error',res)

     }



 }

eject()


const comprar = () => {
    console.log('haciendo cliock en comprar');
    const respprod = JSON.parse(localStorage.getItem('products'))
    console.log('viendo todos los productos', respprod);
    for (const iterator of respprod) {
        if (iterator.cantidad > 1){
            iterator.total = iterator.cantidad * iterator.precio
        }else{

            iterator.total = iterator.precio

        }

    }
    // window.location.href = '/cart/sellCarts';
}





