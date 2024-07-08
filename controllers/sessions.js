
import fs from "fs-extra";
import { fileURLToPath } from "url";
import path, { dirname } from "path";


import { request,response } from "express";
import User from "../dao/mongo/models/usermodels.js";
import UserDB from "../dao/mongo/usermodelsBD.js";
import UserDTO from "../dao/DTOs/user.dto.js";
import UsersDTO from "../dao/DTOs/users.dto.js";
import { generateUsers } from "../helpers/generateUser.js";
import { changeRoleSer, deleteBeforeTwoSer, deleteUserSer, findByIdChangePremiumSer, findServiceUSer, getAllUsersSer, getUserByIdServAndCharge, serviceFindByIDanUpdate, updateAnythingSer } from "../services/userServices.js";
import { deleteUserMail, mail } from "../helpers/nodemailer.js";
import config from "../config/config.js"
import { jwtVerify } from "../helpers/jwt.js";
const userServ = new UserDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


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

     
        res.json({
            msg:'usuario registrado'
        })
        
    } catch (error) {

       res.status(400).json({
        msg: error.message
       })
    }
   
}



export const login =  async(req = request,res = response)=> {

    try {   
            req.logger.info('este es el user de passport?',req.user)
            if (req.user) {
          
            const {first_name,last_name,email,age,role,carts,_id,perfilPicture} = req.user
            const idCart = carts
            const idUserString = _id ? _id.toString() : null
            req.logger.info('carrito asignado',idCart)
           

            await userServ.getTimeUserLoggin(_id)
            /** agregar dtos */
  
            const info = new UserDTO({
                first_name,
                last_name,
                email,
                age,
                role,
                carts:idCart,
                id:idUserString,
                perfilPicture,
             
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

export const logout =  async(req = request,res = response)=>{
    try {
        
        const {id}=req.session.user 
        console.log(id);
        await userServ.getTimeUserLogout(id)
        req.session.destroy(async(err)=> {
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
export const changeRol = async (req,res,next) => {
    try {
    const {id,role} = req.body
    console.log('id y role');
    const actVal = await changeRoleSer(id,role)
    res.json({
        msg: 'success'
    })    
    } catch (error) {
    
        req.logger.error('Error al cambiar el rol')
        next(error)
    }

}
export const premium = async (req,res,next) => {
    try {
        const id = req.params.uid
        const changeToPremium = await findByIdChangePremiumSer(id)
      
        req.session.user.role = changeToPremium.role
        req.session.save()
      
        res.json({
            msg: "acceso a usuario premium"
        })
        
    } catch (error) {
        req.logger.error('Error en el update a premium, documentos')
        console.log(error);
        next(error)
    }

}

export const documentPremium = async(req,res,next) => {
    try {
      
        console.log('llegando');
        const id = req.params.uid
        // const { documento, domicilio } = req.files;
        // console.log('ver doument',documento[0],domicilio[0]);
        // console.log(typeof req.files);
        //     const validatePremium={
        //         document : documento,
        //         home : domicilio
        //     }
        //    const user = await getUserByIdServAndCharge(id,validatePremium)
        //    res.json(user)


      /** Opcion sin multer solucion debido al Frontend */      


      const newDocument = {
        name: 'valor prueba',
        reference: 'valor prueba',
      };
      const newAdress = {
        name: 'valor prueba',
        reference: 'valor prueba',
      };
            
            await updateAnythingSer(id, {
            status: true,
            $push: {
                documents: newDocument,
                documents: newAdress
            }
        })
        
    } catch (error) {
        req.logger.error('Error en el update a Premium')
        console.log(error.message);
        next(error)
    }
  
}

export const picture= async (req,res) => {
    try {
        
        console.log('hola llego bien');

    const id = req.params.id
    const img = req.file.filename
    const {picturepath} = req.body

    if (picturepath !== '/perfil/algo.jpg') {
        console.log('debo del el picturePath',picturepath);
        const filePath = path.join(__dirname, '../public', picturepath);
        console.log('Ruta completa a eliminar:', filePath);
        await fs.unlink(filePath)
        
    }
   
    const perfilPicture = 'https://proyecto-production-1d58.up.railway.app/perfil/' + img
    const actPicture = await User.findByIdAndUpdate(id,{perfilPicture:perfilPicture},{new:true})
    req.session.user.perfilPicture = perfilPicture
    req.session.save()
    console.log('quiero ver session en perfil como quedo', req.session.user);
    res.json({
        msg: "enviado"
    })
    

} catch (error) {
    console.log(error);
}
}

export const allUsers = async(req,res,next) => {
try {
    const usuarios = await getAllUsersSer()
    const value = new UsersDTO(usuarios)
    console.log(value);

    res.json({
        msg: 'all users'
    })
} catch (error) {
    req.logger.error('Error al mostrar todos los usuarios')
    console.log(error.message);
    next(error)
}
}

export const deleteUser = async(req,res,next) =>{
    try {
       const id = req.query.id
       const check = req.query.check
       const admin = req.body.admin
       if (id) {
          const usuario = await deleteUserSer(id)
          console.log(usuario.email);
          deleteUserMail(usuario.email)
       }
       if (check) {
        console.log('entrando a check');
        await deleteBeforeTwoSer(admin)
       }
       res.json({
        msg: "success"
       })
     
        
    } catch (error) {
        req.logger.error('error al borrar Usuario')
        console.log(error.message);
        next(error)
        
    }

}