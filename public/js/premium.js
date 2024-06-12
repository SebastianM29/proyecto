
const documentsPremium = document.querySelector('.infoPremium')



documentsPremium.addEventListener('submit', async(e) => {
  try {
    e.preventDefault()
    console.log('click en subir archivo');
    const id = document.querySelector('.namePerfil').getAttribute('data-id')
    const documento = document.getElementById('uploadDocumento').files[0]
    const domicilio = document.getElementById('uploadDomicilio').files[0]
    console.log('deberia ver el id?', documento);
    const formData = new FormData()

    formData.append('document',documento)
    formData.append('home',domicilio)
  
    const res = await fetch(`http://localhost:3000/api/session/users/premium/${id}/documents`,{
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const respuesta = await res.json()
      console.log('hay algo mal');
      console.log(respuesta);      
    }
    if (res.ok) {
      const respuesta = await res.json()
      
      console.log(respuesta);      
    }
    
  } catch (error) {
    console.log(error);
  }


})

const checkPremium = async() => {
  try {
    const id = document.querySelector('.namePerfil').getAttribute('data-id')

    console.log('hola');
    const resp = await fetch(`http://localhost:3000/api/session/users/premium/${id}`, {
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