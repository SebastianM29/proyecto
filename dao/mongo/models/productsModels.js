import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//nombre para el model
const prod = "products"

const ProductsSchema = mongoose.Schema({
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
        default: true
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


//habilitar paginate mediante plugin
ProductsSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(prod,ProductsSchema)

export default productModel