const eject = async() => {
    const id = document.getElementById('prid')
    const valor = id.dataset.id
    console.log('debo ver el valor',valor)
     const resp = await fetch(`/carts/${valor}`)
     if (resp.ok) {
        const res =await resp.json()
        console.log( 'este es el array?',res)
        const carritos = document.querySelector('.carritos')
        // const resCarr = res.products
        carritos.innerHTML=''
        res.products.forEach(element => {
            console.log(element)
            const div = document.createElement('div')
            div.classList= 'viewsCart'
            div.innerHTML= `
            <p><strong>Categoría: </strong>${element.id.category}</p>
            <p><strong>Titulo: </strong>${element.id.title}</p>
            <p><strong>Descripcion: </strong>${element.id.description}</p>
            <p><strong>Precio: </strong>${element.id.price}</p>
            <p><strong>Codigo: </strong>${element.id.code}</p>
            <p><strong>Stock: </strong>${element.id.stock}</p>
            <p><strong>Cantidad: </strong>${element.quantity}</p>
            `
            carritos.appendChild(div)
            
        });

    }else{
         const res =await resp.json()
         console.log('error',res)

     }



 }

eject()





