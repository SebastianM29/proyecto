import nodemailer from "nodemailer"
import config from "../config/config.js"
import { generateToken } from "./jwt.js"

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
      <a href="http://localhost:3000/api/session/new/${jwt}">Haga click en este enlace</a>
      </div>`,
      attachments:[]
   })

 return transport

}


  