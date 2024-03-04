
const seeCart = document.getElementById('cart-form')

const agregarAlCarrito = async(id) => {
    try {
        
        console.log('aca se va a agregar el carrito',id)
        const cSelect = document.getElementById("carrito-select");
        // Mostrar el valor del select en la consola
        console.log(cSelect.value);
        console.log('debo ver el id',id)
        const resp = await fetch(`/carts/${cSelect.value}/products/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que los datos son de tipo JSON
            },
    
        })
        if (resp.ok) {
            try {
                
                const res = await resp.json()
               
                console.log('me selecciona el producto?',res)
                
                const result = await fetch(`/products/${id}`)
                const datos  =await result.json()
                console.log('este deberia ser el producto', datos.productos.stock)  
                
                const stock = document.getElementById(`1${id}`)
                stock.innerHTML = `<strong>Stock:</strong>${datos.productos.stock}`
                
                const selecProd = document.getElementById(id)
                
                console.log(selecProd)
                selecProd.textContent= 'agregado'
                setTimeout(() => {
                 selecProd.textContent = 'agregar al carrito'
                }, 3000);
     
     
                //  window.location.href = 'http://localhost:3000/'
            } catch (error) {
                console.log(error)
            }
        }else{

           const res = await resp.json()
        //    const resmsg = JSON.parse(res)
           console.log('que me trae en el error',res)
           const selecProd = document.getElementById(`${res}`)
           selecProd.textContent= 'sin stock'
           setTimeout(() => {
            selecProd.textContent = 'agregar al carrito'
           }, 3000);

        }

    } catch (error) {
        
    }
    

}

seeCart.addEventListener('submit', async(e)=> {
e.preventDefault()
//especificar un camino o ruta para encontrar un elemento dentro de la estructura del DOM
const cart = document.querySelector('.form-select')
console.log(cart.value)
console.log('llegando al submit')
try {
     const resp = await fetch(`/carts/${cart.value}`)
     if (resp.ok) {
        const res =await resp.json()
        console.log(res.products)
        const carritos = document.querySelector('.carritos')
        const resCarr = res.products
        carritos.innerHTML=''
        resCarr.forEach(element => {
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
    
 } catch (error) {
    
 }
})



