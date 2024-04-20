
const seeCart = document.getElementById('cart-form')
const addProduct = document.getElementById('addProduct')
const actProducts = document.getElementById('actProductForm')




const agregarAlCarrito = async(id) => {

    const valorProd = JSON.parse(localStorage.getItem('products')) || [];
    
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
       cantidad : 1

    }
    if (valorProd.length === 0 ) {
        valorProd.push(obj)
        console.log('no hay nada en el array le agrego uno', valorProd);
        return localStorage.setItem('products',JSON.stringify(valorProd))
    }else{

        valorProd.map((element) => {
            if (element.id === obj.id) {
                console.log('pasando por adentro del map');
                element.cantidad +=1 
                localStorage.setItem('products',JSON.stringify(valorProd))
            }
        } )



    }
    console.log('pasando por afuera');
    
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
    // e.preventDefault()
   
    try {
        const categoria = document.getElementById('categoria').value
        const titulo = document.getElementById('titulo').value
        const descripcion = document.getElementById('descripcion').value
        const precio = document.getElementById('precio').value
        const codigo = document.getElementById('codigo').value
        const stock = document.getElementById('stock').value
        const formData = {
            category : categoria,
            title: titulo,
            description: descripcion,
            price: precio,
            code: codigo,
            stock: stock,
        }
        console.log(formData)
        const resp = await fetch('/products',{
            method: 'POST',
            headers:{
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        })
       
        if (resp.ok) {
            const datos = await resp.json()  
            console.log('datos obtenidos',datos)
      
        }
        if(!resp.ok){
            console.log('algo paso');
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
               // e.preventDefault()
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
  
    }
    if(!resp.ok){
        const datos = await resp.json() 
        console.log('algo paso en add actualizar' , datos);
    }
    
    window.location = 'http://localhost:3000/'
    } catch (error) {
          console.log(error)  
    }
 
    
})

