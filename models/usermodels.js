import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    first_name:{ 
      type : String,
      required:[true,'nombre obligatorio']
    },
    last_name:{ 
        type : String,
        required:[true,'apellido obligatorio']
    },
    email:{ 
        type : String,
        required:[true,'correo obligatorio/unico'],
        unique:true
        
    },
    age:{ 
        type : String,
        required:[true,'edad obligatorio']
    },
    password:{
        type: String,
        required:[true,' la contraseña es obligatoria'],
        
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'

    }


}
)



export default model ('User', UserSchema)