

const seeCart = document.getElementById('cart-form')
const addProduct = document.getElementById('addProduct')
const actProducts = document.getElementById('actProductForm')





const agregarAlCarrito = async(id) => {
    
    // const noStock = JSON.parse(localStorage.getItem('noStock')) || [];
    const valorProd = JSON.parse(localStorage.getItem('products')) || [];
    //cambiar stock
    const stockSave = document.getElementById(`1${id}`).childNodes[1].nodeValue.trim()
    console.log('que veo en el stockSave',stockSave);
    if (stockSave == 0) {
        console.log('entra para sehabilitar?');
        const canceledButton = document.getElementById(id)
        canceledButton.textContent = 'Sin stock'
        canceledButton.disabled = true;
        return
    }else{

        const changeStock = stockSave - 1 
        const stockChange = document.getElementById(`1${id}`).childNodes[1]
        stockChange.nodeValue = `${changeStock}`;


    }
    
    console.log('hago click');
    const valor = document.getElementById(`producto-${id}`)
    const nuevo = valor.dataset.productoId
    const categoria = document.getElementById(`categoria${id}`).childNodes[1].nodeValue.trim()
    const titulo = document.getElementById(`titulo${id}`).childNodes[1].nodeValue.trim()
    const descripcion = document.getElementById(`descripcion${id}`).childNodes[1].nodeValue.trim()
    const precio = document.getElementById(`precio${id}`).childNodes[1].nodeValue.trim()
    const codigo = document.getElementById(`codigo${id}`).childNodes[1].nodeValue.trim()
    const stock = document.getElementById(`1${id}`).childNodes[1].nodeValue.trim()
    
    const obj = {
       id : nuevo,
       categoria,
       titulo,
       descripcion,
       precio,
       codigo,
       cantidad : 1,
       stock,
       stockTotal: stockSave

    }

    if (valorProd.length === 0 ) {
        valorProd.push(obj)
        console.log('no hay nada en el array le agrego uno', valorProd);
        return localStorage.setItem('products',JSON.stringify(valorProd))
    }
     
    const findID = valorProd.find(element => element.id === obj.id)
    console.log(findID);
    if (findID) {
        for (const iterator of valorProd) {
            // if (iterator.stock < obj.cantidad) {
            //     console.log('error de stock', iterator)
            //     noStock.push(iterator)
            //     localStorage.setItem('noStock',JSON.stringify(iterator))
            // }
          if (iterator.id === obj.id) {
                iterator.cantidad += 1
                iterator.stock -= 1
                
            }
        }

        console.log('aca anda y entra como corresponde');
    } 
    else{
    valorProd.push(obj)
    }


    console.log('aca deberia estar todo arreglado',valorProd)
    const parseValue = JSON.stringify(valorProd)
    localStorage.setItem('products',parseValue)
    
    console.log('manejando valores del boton');

    // console.log('deberia ver el stock',stock)
    // const newValue = stock - 1
    // console.log('deberia ver el stock actualizado',newValue)


    
    
    // setTimeout(() => {
    //     selecProd.textContent = 'agregar al carrito'
    // }, 3000);
        

    // const newValue = JSON.stringify(newProdCantidad)
    // localStorage.setItem('products',JSON.stringify(newValue))

    

    
    
    
    // try {
        
    //     console.log('aca se va a agregar el carrito',id)
    //     const cSelect = document.getElementById("carrito-select");
    //     console.log('seria el dataset',cSelect.dataset.id)
    //     // Mostrar el valor del select en la consola
     
    //     console.log('debo ver el id',id)
    //     const resp = await fetch(`/carts/${cSelect.dataset.id}/products/${id}`,{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json' // Indica que los datos son de tipo JSON
    //         },
    
    //     })
    //     if (resp.ok) {
    //         try {
                
    //             const res = await resp.json()
               
    //             console.log('me selecciona el producto?',res)
                
    //             const result = await fetch(`/products/${id}`)
    //             const datos  =await result.json()
    //             console.log('este deberia ser el producto', datos.productos.stock)  
                
    //             const stock = document.getElementById(`1${id}`)
    //             stock.innerHTML = `<strong>Stock:</strong>${datos.productos.stock}`
                
    //             const selecProd = document.getElementById(id)
                
    //             console.log(selecProd)
    //             selecProd.textContent= 'agregado'
    //             setTimeout(() => {
    //              selecProd.textContent = 'agregar al carrito'
    //             }, 3000);
     
     
    //             //  window.location.href = 'http://localhost:3000/'
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }else{

    //        const res = await resp.json()
    //     //    const resmsg = JSON.parse(res)
    //        console.log('que me trae en el error',res)
    //        const selecProd = document.getElementById(`${res}`)
    //        selecProd.textContent= 'sin stock'
    //        setTimeout(() => {
    //         selecProd.textContent = 'agregar al carrito'
    //        }, 3000);

    //     }

    // } catch (error) {
        
    // }
    

}
/**eliminar producto siendo admin */
const eliminarProd = async(id) => {

    try {
        
        console.log('este seria el id', id)
        const resp = await fetch(`/products/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Indica que los datos son de tipo JSON
            },
    
        })
        if (resp.ok) {
            const datos= await resp.json()
            console.log('borrado',datos)
            const deleteProd = document.getElementById(`producto-${id}`)
            deleteProd.remove()
            
        }
        if (!resp.ok) {
            console.log('borrado')
            
        }
    } catch (error) {
        
    }

    

}

/** agregar producto siendo admin */
addProduct.addEventListener('submit',async(e)=>{
    e.preventDefault()
   
    try {
        const categoria = document.getElementById('categoria').value
        const titulo = document.getElementById('titulo').value
        const descripcion = document.getElementById('descripcion').value
        const precio = document.getElementById('precio').value
        const codigo = document.getElementById('codigo').value
        const stock = document.getElementById('stock').value
        const thumbnail = document.getElementById('thumbnail').files[0]

        const formData = new FormData()
        formData.append('category', categoria)
        formData.append('title', titulo)
        formData.append('description', descripcion)
        formData.append('price', precio,)
        formData.append('code', codigo)
        formData.append('stock', stock)
        formData.append('thumbnail', thumbnail)

     
       
        const resp = await fetch("/products",{
            method: 'POST',
            body:formData
        })
       
        if (resp.ok) {
            const datos = await resp.json()  
            console.log('datos obtenidos',datos)
            window.location.reload()
      
        }
        if(!resp.ok){
            const datos = await resp.json() 
            console.log('algo paso',datos);
        }
   
        
    } catch (error) {

        console.log( 'msg!!!!!',error)
        
    }

})
/** Actualizar */
const actualizar  = async( id ) => {
  
    
const removeAdd = document.getElementById('addProduct')
const actform = document.getElementById("actProductForm");
removeAdd.setAttribute('hidden',true)
actform.removeAttribute('hidden')


// Para ocultar el elemento
  

 try {
    const resp = await fetch(`/products/${id}`)
    if (resp.ok) {
    const datos = await resp.json()

    console.log('seria el id',id)
    console.log('seria el id',datos.productos._id)
    const categoria = document.getElementById('categoriaAct')
    const titulo = document.getElementById('tituloAct')
    const descripcion = document.getElementById('descripcionAct')
    const precio = document.getElementById('precioAct')
    const stock = document.getElementById('stockAct')
    
    categoria.value = datos.productos.category
    titulo.value = datos.productos.title
    descripcion.value = datos.productos.description
    precio.value = datos.productos.price
    stock.value = datos.productos.stock
    
    actProducts.setAttribute('data-id', id)
 




}
} catch (error) {
    
}
}


    actProducts.addEventListener('submit', async(e) => {
        try {
    e.preventDefault()
    const idCapture = actProducts.getAttribute('data-id')
    console.log('estoy tocando ese boton',idCapture);
    const categoria = document.getElementById('categoriaAct').value
    const titulo = document.getElementById('tituloAct').value
    const descripcion = document.getElementById('descripcionAct').value
    const precio = document.getElementById('precioAct').value
    const stock = document.getElementById('stockAct').value
    const formData = {
        category : categoria,
        title: titulo,
        description: descripcion,
        price: precio,
        stock: stock,
    }
    console.log(formData)
    
    const resp = await fetch(`/products/${idCapture}`,{
        method: 'PUT',
        headers:{
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
    })
   
    if (resp.ok) {
        const datos = await resp.json()  
        console.log('datos obtenidos',datos)
        window.location.reload()
  
    }
    if(!resp.ok){
        const datos = await resp.json() 
        console.log('algo paso en add actualizar' , datos);
    }
    
    window.location = 'https://proyecto-production-7bcc.up.railway.app/'
    } catch (error) {
          console.log(error)  
    }
 
    
})

