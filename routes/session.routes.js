import { Router} from "express";
const router = Router()
import User from "../models/usermodels.js";





router.post('/register', async(req,res)=> {
    try {
        const{first_name,last_name,email,age,password,role} = req.body
         const find = await User.findOne({role})
         if (find) {
            throw new Error ('Admin ya existente')
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
   
})



router.post('/login', async(req,res)=> {

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

        console.log('entra aca')
        console.log(error)
        
    }
})


router.get('/logout', (req,res)=>{
    try {
        req.session.destroy((err)=> {
            if (err) {

                res.status.send('error al destruir session')
            }
            res.clearCookie('connect.sid')
            res.redirect('/login')
        })
    } catch (error) {
        
    }
})


export default router