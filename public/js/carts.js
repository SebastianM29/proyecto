



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






 }

eject()


const comprar = async() => {
    let sumaAmount = 0
    console.log('haciendo cliock en comprar');
    const respprod = JSON.parse(localStorage.getItem('products'))
    console.log('viendo todos los productos', respprod);
    const id = document.getElementById('prid')
    const valor = id.dataset.id
    console.log('debo ver el valor',valor)

    /**  Descuenta de a uno... falta q si el stock cambia */

    //ITERATOR.CANTIDAD
    //ITERATOR.stock
    const noStock = respprod.filter(element => parseInt(element.cantidad) > parseInt(element.stockTotal))
    const siStock = respprod.filter(element => parseInt(element.cantidad) <= parseInt(element.stockTotal))
    console.log('deberia tener los q no tienen stock', noStock);
    noStock.forEach(element => console.log(element));

    console.log('deberia tener los q no tienen stock', siStock);
    siStock.forEach(element => console.log(element));


    for (const iterator of siStock) {
        try {
            
            let productStock = iterator.cantidad
            const resp = await fetch(`/carts/${valor}/products/${iterator.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({productStock}) //manejar stock
            });

            if (resp.status === 404) {
                
                const res = await  resp.json()
                console.log('este seria el faltante',res)
            }
        
            if (resp.ok) {
                console.log('Solicitud exitosa');
    
             
               
              
            } else {
                /** DEVOLVER LOS PRODUCTOS CON STOCK 0 */
                //nuca va a entrar porque filtro en el post los q tienen stock
                console.error('Error en la solicitud:', resp.status);
                
                window.location.href= 'fail'
                return
            }
        } catch (error) {
            localStorage.removeItem('products')
            window.location.href= 'fail'
            return
        }



        
    }
    for (const iterator of siStock) {
        if (iterator.cantidad > 1){
            iterator.total = iterator.cantidad * iterator.precio
            sumaAmount += JSON.parse(iterator.total)
        }else{

            iterator.total = JSON.parse(iterator.precio)
            sumaAmount += iterator.total

        }

    }




    try {
        const resp = await fetch(`/carts/${valor}/purchase`,{
            method: 'POST',
            headers:{
                'content-Type' : 'application/json'
            },
            body: JSON.stringify({sumaAmount})
          
        })
        if (resp.ok) {
            console.log('ticket exitoso')
        }
        if (!resp.ok) {
            console.log('problema al generar ticket ')
            
        }
            
        } catch (error) {
            
        }

  
    console.log('deberia ver todos los productos con el precio total',siStock);
    console.log('precio total',sumaAmount);

    localStorage.setItem('products',JSON.stringify(siStock))
    localStorage.setItem('noproducts',JSON.stringify(noStock))

    



    window.location.href = '/cart/sellCarts';
}





