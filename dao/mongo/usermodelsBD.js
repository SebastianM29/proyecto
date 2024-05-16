import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import User from "../mongo/models/usermodels.js" 
import config from "../../config/config.js"
import { jwtVerify } from "../../helpers/jwt.js";
import { createHash } from "../../helpers/hash.js";



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
        /** ERROR PERSONALIZADO */
        /**        aca          */
        /**-------------------- */
        console.log("el token",id,"y el pass",pass);
        const hashPass = createHash(pass)
        await User.findByIdAndUpdate(id,{password:hashPass},{new:true})

    }

   
}