



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


const comprar = async() => {
    console.log('haciendo cliock en comprar');
    const respprod = JSON.parse(localStorage.getItem('products'))
    console.log('viendo todos los productos', respprod);
    const id = document.getElementById('prid')
    const valor = id.dataset.id
    console.log('debo ver el valor',valor)

    /**  Descuenta de a uno... falta q si el stock cambia */
    for (const iterator of respprod) {
        let productStock = iterator.cantidad
        const resp = await fetch(`/carts/${valor}/products/${iterator.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productStock}) //manejar stock
            // Si necesitas enviar datos en el cuerpo de la solicitud, reemplaza 'data' con tus datos
        });
    
        // Aquí puedes manejar la respuesta de cada solicitud, por ejemplo, verificar el estado de la respuesta:
        if (resp.ok) {
            console.log('Solicitud exitosa');

         
           
            // Haz algo con la respuesta, como procesarla o mostrar un mensaje al usuario
        } else {
            console.error('Error en la solicitud:', resp.status);
            // Manejar el error de la solicitud, como mostrar un mensaje de error al usuario
        }
    }

    for (const iterator of respprod) {
        if (iterator.cantidad > 1){
            iterator.total = iterator.cantidad * iterator.precio
        }else{

            iterator.total = iterator.precio

        }

    }
    console.log('deberia ver todos los productos con el precio total',respprod);
    localStorage.setItem('products',JSON.stringify(respprod))



    window.location.href = '/cart/sellCarts';
}





