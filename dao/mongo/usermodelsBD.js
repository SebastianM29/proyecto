import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import User from "../mongo/models/usermodels.js" 
import config from "../../config/config.js"
import { jwtVerify } from "../../helpers/jwt.js";
import { compare, createHash } from "../../helpers/hash.js";



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
      
      const format = new Intl.DateTimeFormat('es-AR',this.options);
      const date = format.format(now);
      //anidado va a ser  siempre entre comillas
      return await User.findByIdAndUpdate(id,{'last_conection.loggin': date},{new:true})
      

    };

    async getTimeUserLogout(id){
       let now = new Date()
         
       const format = new Intl.DateTimeFormat('es-AR',this.options);
       const date = format.format(now);
       //anidado va a ser  siempre entre comillas
       return await User.findByIdAndUpdate(id,{'last_conection.logout': date},{new:true})
       
 
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
       value.documents = []
       for (const key in charge) {
         const obj = {
            name: charge[key][0].fieldname,
            reference:charge[key][0].destination
         }
         value.documents.push(obj)
       }
       console.log('no se q se debe ver',charge.document[0])
        value.status = true
        console.log(value);
        await value.save()
        return ({
            msg : "info actualizada" 
        })
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

   
}