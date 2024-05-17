const pudDates = document.querySelector('#putDates')

pudDates.addEventListener('submit', async(e)=> {
    try {
       
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
        }
        if (!data) {
            const resp = await data.json()
            console.log('creo q no retorna nada',resp);
            
        }
        






    } catch (error) {
        console.log(error)
    }
})