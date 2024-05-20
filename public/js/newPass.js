const pudDates = document.querySelector('#putDates')

pudDates.addEventListener('submit', async(e)=> {
    const messageButton = document.getElementById('saveNew')
    try {

        
        e.preventDefault()
        const urlParams = window.location.pathname.split('/').pop()
        console.log('path token',urlParams);
    
        const pass = document.getElementById('pass').value
        const repeatPass = document.getElementById('repeatPass').value
        if (pass != repeatPass) {
            console.log('escruiba igual gil');
            return
        }
        /** ruta put */
        const data = await fetch(`/api/session/updPass`, {
           method: 'PUT',
           headers:{
            'Content-Type' : 'application/json'
           },
         body: JSON.stringify({
            token:urlParams,
            password:repeatPass
         })
        })
        if (data.ok){
          console.log('deberia actualizarse');
          messageButton.innerHTML = "Actualizado exitosamente"
          setTimeout(() => {
              messageButton.innerHTML= "Guardar nuevo Password"   
          }, 3000); 
        }
        if (data.status === 404) {
            const resp = await data.json()
            console.log('pass',resp.causa);
            messageButton.innerHTML = resp.causa 
            setTimeout(() => {
                messageButton.innerHTML= "Guardar nuevo Password"   
            }, 3000); 
            
        }
        if (data.status === 400) {
            const resp = await data.json()
            console.log('pass',resp);
            messageButton.innerHTML = resp.causa 
            setTimeout(() => {
                messageButton.innerHTML= "Guardar nuevo Password"   
            }, 3000); 
            
        }

        if (data.status === 500) {
            const resp = await data.json()
           
            messageButton.innerHTML = "envie Email nuevamente"
            setTimeout(() => {
                messageButton.innerHTML= "Guardar nuevo Password"   
            }, 3000); 
            
        }
        






    } catch (error) {
        console.log('entra aca?');
        console.log(error)
    }
})