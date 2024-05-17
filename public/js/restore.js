const restore =  document.querySelector('.restoreForm')

restore.addEventListener('submit', async(e) => {
    e.preventDefault()
    const messageButton = document.getElementById('linkRestore')
    try {
        console.log('entrando')
        const email = document.getElementById('email').value
        console.log('entrando este es el email',email )
        const data = await fetch('/api/session/restorePass',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify({email : email})
    
    
        })
        
    
        if (data.ok) {
            messageButton.innerHTML = "Revise su correo"  
            setTimeout(() => {
                messageButton.innerHTML= "Envio link recuperacion"   
            }, 3000); 
        }
        if (!data.ok) {
            messageButton.innerHTML= "Envie un email Registrado"
            setTimeout(() => {
                messageButton.innerHTML= "Envio link recuperacion"   
            }, 3000);
            const resp = await data.json()
            console.log(resp)
        }

    } catch (error) {
        console.log(error)

  
    }

})