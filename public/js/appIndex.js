
  

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
           const res = await resp.json()
           console.log('que me trae',res)
            
        }else{

            const res = await resp.json()
           console.log('que me trae en el error',res)

        }

    } catch (error) {
        
    }
    

}
