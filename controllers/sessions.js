
import { request,response } from "express";
import User from "../dao/mongo/models/usermodels.js";
import UserDTO from "../dao/DTOs/user.dto.js";
import { generateUsers } from "../helpers/generateUser.js";
import { findServiceUSer, serviceFindByIDanUpdate } from "../services/userServices.js";
import { mail } from "../helpers/nodemailer.js";
import config from "../config/config.js"
import { jwtVerify } from "../helpers/jwt.js";



export const register = async(req = request,res = response)=> {
    try {
        const{first_name,last_name,email,age,password,role} = req.body
       
         if (role === 'admin') {
             const find = await User.findOne({role:'admin'})
             if (find) {
                throw new Error ('Admin existente')
             }
             if (password !== 'adminCod3r123' || email !== 'adminCoder@coder.com') {

                throw new Error ('Datos no validos')
                 
             }

         }

        await User.create({first_name,last_name,email,age,password,role})

        console.log('algo deberia venir no se')
        res.json({
            msg:'usuario registrado'
        })
        
    } catch (error) {
        console.log('algo deberia ')
       res.status(400).json({
        msg: error.message
       })
    }
   
}



export const login =  async(req = request,res = response)=> {

    try {   
            req.logger.info('este es el user de passport?',req.user)
            if (req.user) {
            console.log('entro aca al res backend')
            const {first_name,last_name,email,age,role,carts} = req.user
            const idCart = carts
            console.log('este seria el carrito asignado que quilombo tengo',idCart)
            /** agregar dtos */

            const info = new UserDTO({
                first_name,
                last_name,
                email,
                age,
                role,
                carts:idCart
            }
       )

            req.session.user = info
       
            res.redirect('/')
        }
        
    } catch (error) {

        res.status(401).json({msg: error.message})
       
        
    }
}

export const restore = (req,res) => {
 req.logger.info('render restore')
 res.render('restore')
}
export const restorePass = async(req,res,next) => {
    /** ESTRUCTURAR LUEGO */
    try {
     req.logger.info('enviando mail')

     const emailRestore = await findServiceUSer(req.body)
     mail(emailRestore._id,emailRestore.email)
  
     
    
     res.status(200).json({
     msg:"CORREO ENVIADO"
        
     })
        
    } catch (error) {
        req.logger.error('Error Envio de MAIL')
        next(error)
    }
}

export const newPass = async(req,res) => {
    try {
        req.logger.info('render newPass')

        const token = req.params.token
        const data = jwtVerify(token,config.secretWORD)
     
     
        
       
        res.render('newPass')
           
       } catch (error) {
           req.logger.error('Error Pass')
           res.render('expired')
           
       }

}
export const updPass = async(req,res,next) => {
try {
    const{token,password} = req.body
    req.logger.info(`recibiendo token:${token} y pass:${password}`)

    await serviceFindByIDanUpdate(token,password)
    res.json({msg:"aca esta"})
} catch (error) {
    req.logger.error('Error en el update')
    next(error)
    
}


}

export const logout =  (req = request,res = response)=>{
    try {
        req.session.destroy((err)=> {
            if (err) {

                res.status.send('error al destruir session')
            }
            res.clearCookie('connect.sid')
            res.redirect('/login')
        })
    } catch (error) {

      throw error
    }
} 

export const testUser = (req,res) => {
    try {
        

       
            const value = generateUsers()
            
     
        res.json(
            
            value
        )
    } catch (error) {
        
    }
}