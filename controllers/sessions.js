
import { request,response } from "express";
import User from "../dao/mongo/models/usermodels.js";

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
            console.log('este es el user de passport?',req.user)
            if (req.user) {
            console.log('entro aca al res backend')
            const {first_name,last_name,email,age,role,carts} = req.user
            const idCart = carts
            console.log('este seria el carrito asignado que quilombo tengo',idCart)
            req.session.user = {
                first_name,
                last_name,
                email,
                age,
                role,
                carts:idCart
            }
       
            res.redirect('/')
        }
        
    } catch (error) {

        res.status(401).json({msg: error.message})
       
        
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