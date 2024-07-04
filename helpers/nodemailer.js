import nodemailer from "nodemailer"
import config from "../config/config.js"
import { generateToken } from "./jwt.js"

const configTransporter = {
  service:"gmail",
  host: "smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
    user: config.userNodemailer,
    pass: config.passNodemailer
  }
}

export const mail = async(id,email) => {

 const jwt = generateToken(id)
  const transport = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
    user: config.userNodemailer,
    pass: config.passNodemailer
  }
 })
 await transport.sendMail({
    from:`correo prueba <${config.userNodemailer}>`,
    to:email,
    subject: "correo de prueba",
    html:` <div>
      <h1> RESTABLEZCA LA CONTRASEÑA</h1>
      <a href="http://proyecto-production-1d58.up.railway.app/api/session/new/${jwt}">Haga click en este enlace</a>
      </div>`,
      attachments:[]
   })

 return transport

}

export const deleteUserMail = async(mail) => {
  const transport = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
      user: config.userNodemailer,
      pass: config.passNodemailer
    }
   })

   await transport.sendMail({
    from:`correo prueba <${config.userNodemailer}>`,
    to:mail,
    subject: "correo de prueba",
    html:` <div>
      <h1>Nos comunicamos para informarle que eliminamos su cuenta de nuestra pagina debido a su inactividad</h1>
      <a href="http://proyecto-production-1d58.up.railway.app">Visite nuestra pagina</a>
      </div>`,
      attachments:[]
   })

   return transport

}
export const deleteUserMailTwoDays = async(mail) => {
  const transport = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
      user: config.userNodemailer,
      pass: config.passNodemailer
    }
   })

   await transport.sendMail({
    from:`correo prueba <${config.userNodemailer}>`,
    to:mail,
    subject: "correo de prueba",
    html:` <div>
      <h1>Informamos que eliminamos su cuenta de nuestra pagina debido a su inactividad en estas 48hs pasadas desde esta notificacion </h1>
      <a href="http://proyecto-production-1d58.up.railway.app">Visite nuestra pagina</a>
      </div>`,
      attachments:[]
   })

   return transport

}

export const notifyUserDeleteProduct = async(email,product) => {
  console.log('llega a nodem ailer?');
  const transport = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
      user: config.userNodemailer,
      pass: config.passNodemailer
    }
  })
  await transport.sendMail({
    from:`correo prueba <${config.userNodemailer}>`,
    to:email,
    subject: "Eliminacion de Producto",
    html:` 
      <div>
      <h1>Nos comunicamos para informarle que eliminamos de nuestro catalogo su producto: ${product} .  </h1>
      <a href="http://proyecto-production-1d58.up.railway.app">Visite nuestra pagina</a>
      </div>`,
      attachments:[]
  })

}


  