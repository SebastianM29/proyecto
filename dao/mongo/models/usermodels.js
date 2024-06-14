import mongoose , { Schema,model } from "mongoose";

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
    status:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['user','admin','PREMIUM'],
        default:'user'

    },
     carts: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'carts'
            
    },
    documents:[
        {
            name:{
                type:String,

            },
            reference:{
                type:String
            }

        }
    ],
    last_conection:{
        tipe:String
    }
    


    // carritoAsignado:{
    //     id: {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'carts'
            
    //     },
    // }


}
)



export default model ('User', UserSchema)