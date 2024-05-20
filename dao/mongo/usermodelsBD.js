import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import User from "../mongo/models/usermodels.js" 
import config from "../../config/config.js"
import { jwtVerify } from "../../helpers/jwt.js";
import { compare, createHash } from "../../helpers/hash.js";



export default class UserDB  { 
    constructor() {

     

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