
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import User from "../mongo/models/usermodels.js" 
import carts from "../mongo/models/cartsModels.js";
import config from "../../config/config.js"
import { jwtVerify } from "../../helpers/jwt.js";
import { compare, createHash } from "../../helpers/hash.js";
import { deleteUserMailTwoDays } from "../../helpers/nodemailer.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)




export default class UserDB  { 
    constructor() {
      this.options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
     

    }
    async getTimeUserLoggin(id){
      let now = new Date()
      let nowIso = new Date().toISOString()
      
      
      const format = new Intl.DateTimeFormat('es-AR',this.options);
      const date = format.format(now);
      //anidado va a ser  siempre entre comillas
      return await User.findByIdAndUpdate(id,{'connection.loggin': date,'connection.isoLoggin':nowIso},{new:true})
      

    };

    async getTimeUserLogout(id){
       let now = new Date()
       let nowIso = new Date().toISOString()
         
       const format = new Intl.DateTimeFormat('es-AR',this.options);
       const date = format.format(now);
       console.log('el horario en String', nowIso);
       //anidado va a ser  siempre entre comillas
       return await User.findByIdAndUpdate(id,{'connection.logout': date,'connection.isoLogout':nowIso},{new:true})
       
 
    }
    async getAllUsers(){
     return User.find()
    }

    async getUserByEmail(email){
       const value =  await User.findOne(email)
       if (value === null) {
       
        const error = new CustomError(
            "Error Usuario en Base de datos",
            "verifique ID",
            "Error: ID.",
            EErrors.NOT_FOUND
          );
          throw error
       }; 
        
       
        return value
    }
    async getUserByIdAndCharge(id,charge){
      console.log('debo ver el charge', charge);
       const value =  await User.findById(id)
       if (!charge.document || !charge.home || !charge.document[0] || !charge.home[0]) {
        const error = new CustomError(
            "Error cargando los documentos",
            "verifique la carga",
            "Error: Documentos.",
            EErrors.NOT_FOUND
          );
          throw error
        
       }
       if (value === null) {
       
        const error = new CustomError(
            "Error Usuario en Base de datos",
            "verifique ID",
            "Error: ID.",
            EErrors.NOT_FOUND
          );
          throw error
       };
      
       console.log('que trae charge',charge);
      //  for (const key in charge) {
      //   console.log('estoy viendo en KEY',key);
      //   console.log('viendo el obj,',charge[key][0].destination);
      //    const obj = {
      //       name: charge[key][0].fieldname,
      //       reference: path.join(__dirname, '../.././public/documents',charge[key][0].filename)    
      //    }
      //    value.documents.push(obj)
      //  }
      //  console.log('se debe ver',charge.document[0])
      //   value.status = true
      //   console.log(value);
      //   await value.save();

      //   return ({
      //       msg : "info actualizada" 
      //   })
    }

    async findByIdChangePremium (id) {
        const user =  await User.findById(id)
       

       if (!user) {
        const error = new CustomError(
            "Error Usuario en Base de datos",
            "verifique ID",
            "Error: ID.",
            EErrors.NOT_FOUND
          );
          throw error
       }
       
       if (user.status === false) {
         console.log('no cumple');
         const error = new CustomError(
            "No cumple requisitos para usuario Premium",
            "verifique documentos",
            "Error: Documentos.",
            EErrors.NOT_FOUND
          );
          throw error
        
       }
       
       const userUpd = await User.findByIdAndUpdate(id,{role:'PREMIUM'},{new:true})
       return userUpd
 
    }

    async changeRole (id,role) {
    const userUpd = await User.findByIdAndUpdate(id,{role:role},{new:true})
    if (!userUpd) {
      const error = new CustomError(
        "Error al cambiar el Rol",
        "verifique Rol",
        "Error: Rol",
        EErrors.NOT_FOUND
      );
      throw error
    }
    return userUpd
    }

    async findByIdAndUPD (token,pass) {
        const {id} = jwtVerify(token,config.secretWORD)
        const user = await User.findById(id)
       
        const comparePass = compare(user,pass);
        console.log(typeof pass)
   

        if (pass.length < 8 ){
            console.log('debe ser 8');
            const error = new CustomError(
                "Pass",
                "deben ser 8 caracteres",
                "Error: caracteres",
                EErrors.NOT_FOUND
              );
              throw error

        }

        if (comparePass) {
            const error = new CustomError(
                "Error pass",
                "no debe repetir mismo pass",
                "Error: Pass",
                 EErrors.REPEAT_CODE
              );
              throw error
        }
        const hashPass = createHash(pass)
        await User.findByIdAndUpdate(id,{password:hashPass},{new:true})

    }

    async deleteUser(id) {
      const user = await User.findByIdAndDelete(id)
      if (user.carts) {
        const carrito = await carts.findByIdAndDelete(user.carts.toString())
        console.log('carrito eliminado ', carrito);
      }
      if (!user) {
        const error = new CustomError(
          "Error user",
          "usuario no encontrado",
          "Error: user",
           EErrors.NOT_FOUND
        );
        throw error
      } 
     return user
    }

    async deleteBeforeTwo(admin) {
      const twoMinutes =  new Date()
      twoMinutes.setMinutes(twoMinutes.getMinutes() - 2)
      const user = await User.find()
      
      for (const element of user) {
          console.log(element._id.toString(),admin);
          if (element.connection.loggin && element.connection.logout && element._id.toString() != admin) {

          if (element.connection.isoLogout < twoMinutes.toISOString()) {
            console.log('entro');
          await deleteUserMailTwoDays(element.email)
          await carts.findByIdAndDelete(element.carts.toString())
          await User.findByIdAndDelete(element._id)
            
          }
        }
      }
    }

   
}