const socket = io()
let contador = 0

socket.on('connect', ()=>{
    console.log('Cliente conectado')
})

socket.on('disconnect', ()=>{
    console.log('Cliente desconectado del servidor');

})

const user = document.getElementById('form-username')

user.addEventListener('submit',(e)=> {
e.preventDefault()
const value = document.getElementById('username').value
const usuario = value
console.log('deberia ver el nombre',usuario)
console.log('haciendo click en ingrese su nombre')
socket.emit('username',usuario 
// , (cb)=> {
//     console.log(cb)
//     const vistaConectados = document.querySelector('.conectados')
//     cb.forEach(element => {
//         const div = document.createElement('div')
//         div.innerHTML = `<p><strong>${element.usuario}:</strong></p>`
//         vistaConectados.appendChild(div)
//     });
//     console.log(cb)
// }
)
user.reset()
})


const mensajes = document.getElementById('form-messages')

mensajes.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mensaje = document.getElementById('message').value
    socket.emit('crear-mensaje', mensaje)
    console.log('deberia verse una sola vez',mensaje)
    //reset es sobre el formulario
    mensajes.reset()

})

socket.on('usuario-mensaje',(date)=> {
    console.log('el boradcast entra?')
    console.log(date.usuario , date.mensaje)
    const selectChat = document.querySelector('.chat-messages')
    const div = document.createElement('div')
    div.innerHTML= `<p><strong>${date.usuario}: </strong>${date.mensaje}</p> `
    selectChat.appendChild(div)
    contador ++
    const oldMessage = document.querySelectorAll('.chat-messages > div');
    if (contador > 10) {
      oldMessage[0].remove()
    }

})