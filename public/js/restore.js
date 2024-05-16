const restore =  document.querySelector('.restoreForm')

restore.addEventListener('submit', async(e) => {
    e.preventDefault()
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
            console.log('anda bien');  
                 
        }
        if (!data.ok) {
         
            const resp = await data.json()
            console.log(resp)
           
            
        }

    } catch (error) {
        console.log(error)

  
    }

})