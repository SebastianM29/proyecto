const product = document.getElementById('addProduct')


  const documentsPremium = document.querySelector('.infoPremium')
  
  
  
  if (documentsPremium) {
    documentsPremium.addEventListener('submit', async(e) => {
      try {
        e.preventDefault()
        console.log('click en subir archivo');
        const id = document.querySelector('.namePerfil').getAttribute('data-id')
        const documento = document.getElementById('uploadDocumento').files[0]
        const domicilio = document.getElementById('uploadDomicilio').files[0]
        console.log('deberia ver el id?',id, documento);
        console.log('deberia ver el domicilio?',domicilio);
        const formData = new FormData()
    
        formData.append('document',documento)
        formData.append('home',domicilio)
      
        const res = await fetch(`/api/session/users/premium/${id}/documents`,{
          method: 'POST',
          body: formData
        })
    
     
    
        if (res.ok) {
          const datos = await res.json();
          console.log('datos obtenidos', datos);
          const val = document.getElementById('uploadInfo')
          val.innerHTML= 'Info actualizada'
          setTimeout(() => {
            val.innerHTML= 'Actualizar info'
          }, 3000);
      } else {
          const errorData = await res.json();
          console.log('Algo salió mal:', errorData);
      }
        
      } catch (error) {
        console.log(error);
      }
    
    
    })
    
  }
  
  
  
  
  
  
  
  






if (product) {
    
  product.addEventListener('submit',async(e)=>{
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
  
     
        console.log(formData)
        const resp = await fetch('https://proyecto-production-1d58.up.railway.app/products',{
            method: 'POST',
            body:formData
        })
       
        if (resp.ok) {
            const datos = await resp.json()  
            console.log('datos obtenidos',datos)
            const val = document.getElementById('agreg')
            val.innerHTML= 'Producto agregado'
            setTimeout(() => {
              val.innerHTML= 'Agregar producto'
            }, 3000);
            product.reset()
      
        }
        if(!resp.ok){
            const datos = await resp.json() 
            console.log('algo paso',datos);
            const val = document.getElementById('agreg')
            val.innerHTML= 'Verifique Datos'
            setTimeout(() => {
              val.innerHTML= 'Agregar producto'
            }, 3000);
        }
        
    } catch (error) {
  
        console.log( 'msg!!!!!',error)
        
    }
  
  })

}




const checkPremium = async() => {
  try {
    const id = document.querySelector('.namePerfil').getAttribute('data-id')

    console.log('hola');
    const resp = await fetch(`https://proyecto-production-1d58.up.railway.app/api/session/users/premium/${id}`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      }
    })

    if (resp.ok) {
      console.log('excelente');
      window.location.reload()
    }
    if (!resp.ok){
      console.log('no se ve',resp.status);
      const res =await resp.json()
      console.log(res);

    }


  } catch (error) {
    console.log(error);
  }


}
