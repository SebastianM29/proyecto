
// const options = document.querySelectorAll('input[type="radio"]')

// options.forEach(option => {
//     option.addEventListener('click',()=>{
//         options.forEach(opt => {
//             opt.checked = false
//         })

//         option.checked = true

//     })
    
// });



// document.querySelector('.formulario').addEventListener(('submit') , async(e)=>{
//     // e.preventDefault()
//     try {
//         console.log('probando')
//         const elements = document.querySelector('input[name="role"]:checked').value
//         console.log('debo ver el rol',elements)
//         const formData ={
//          first_name : document.getElementById('first_name').value,
//          last_name : document.getElementById('last_name').value,
//          email : document.getElementById('email').value,
//          age : document.getElementById('age').value,
//          password : document.getElementById('password').value,
//          role:elements
//         }

//          const resp = 
//         await fetch('/api/session/register',{
//             method: 'POST',
//             headers:{
//                 'content-Type' : 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         if (resp.ok) {
//             document.getElementById('button-register').textContent = 'registro exitoso'
//             setTimeout(() => {
//                 window.location.href='/login'
//             }, 2000);
//         }
      
//         if(!resp.ok){
//             const res  = await resp.json()
//             console.log('algo esta mal',res.msg) 
//             document.getElementById('button-register').textContent = `${res.msg}`
//             document.getElementById('button-register').disabled = true
//             setTimeout(() => {
//                 document.getElementById('button-register').textContent = 'registrarse'
//                 document.getElementById('button-register').disabled = false
//             }, 3000);
//         }
//     } catch (error) {
//        console.log('error')
//         console.log(error.message)
        
//     }
    


// })



