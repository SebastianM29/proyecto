import { Schema,model } from "mongoose";

const ProductsSchema = Schema({
    title:{
        type: String,
        required:[true , 'title obligatorio']

    },
    description:{
        type: String,
        required:[true, 'description obligatoria']
    },
    code:{
        type: Number,
        required:[true,'code obligatorio'],
        unique:true
    },
    price:{
        type: Number,
        required:[true,'price obligatorio']
    },
    status:{
        type: Boolean,
        // required:[true,'codigo obligatorio']
    },
    stock:{
        type: Number,
        required:[true,'stock obligatorio']
    },
    category:{
        type: String,
        required:[true, 'category obligatoria']
    },
    thumbnail:{
        type: String,
        
    }

})


export default model ('products', ProductsSchema)