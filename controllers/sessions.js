
import { request,response } from "express";
import User from "../models/usermodels.js";

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
        const {email,password} = req.body
        const resp = await User.findOne({email ,password})
        if (!resp) {
            
         throw new Error ('no existe el usuario')
        }
        if (resp) {
            console.log('entro aca al res backend')
            const {first_name,last_name,email,age,role} = resp
            req.session.user = {
                first_name,
                last_name,
                email,
                age,
                role
            }
       
            res.json('usuario encontrado')
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