document.querySelector('.formulario-login').addEventListener(('submit') , async(e)=>{
    e.preventDefault()
    try {
        console.log('probando')
        const formData ={
  
         email : document.getElementById('email').value,
       
         password : document.getElementById('password').value
        }
        
        const resp = await fetch('/api/session/login',{
            method: 'POST',
            headers:{
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (resp.ok) {
            document.getElementById('button-register').textContent = 'inicio exitoso'
            setTimeout(() => {
                window.location.href='/'
            }, 1000);
        }
      
        if(!resp.ok){
            const res  = await resp.json()
            console.log('algo esta mal',res.msg) 
            document.getElementById('button-register').textContent = `${res.msg}`
            document.getElementById('button-register').disabled = true
            setTimeout(() => {
                document.getElementById('button-register').textContent = 'iniciar sesion'
                document.getElementById('button-register').disabled = false
            }, 3000);
        }
    } catch (error) {
       console.log('error')
        console.log(error.message)
        
    }
    


})