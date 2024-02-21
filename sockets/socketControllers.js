import { Messages } from "../dao/messagesBD.js"
import { Usuarios } from "../models/usuarios.js"

const classUsuarios = new Usuarios
const mens = new Messages



export const socketController = (socket,io) =>{
    console.log('cliente conectado', socket.id)

    socket.on('username',(data)=>{
        console.log('entrando a usario back')
    classUsuarios.addUser(data,socket.id) 
    // const valor = classUsuarios.getAllUsers()
    // cb(valor)

    })
    socket.on('crear-mensaje',async (mensaje) => {
        
        const findUser = classUsuarios.getPersonaPorId(socket.id)
        const usuario = findUser[0].usuario
        // console.log(findUser[0].usuario)-usuario
        //todo: agregar a la base de datos. el mensaje
        

        const saved = await mens.saveMessage(usuario,mensaje)
        console.log(saved)
        io.emit('usuario-mensaje',{usuario,mensaje})
    })

    

    socket.on('disconnect',()=> {
        console.log('cliente desconectado',socket.id)
    })

}