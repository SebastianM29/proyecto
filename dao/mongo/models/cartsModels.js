import mongoose, { Schema,model } from "mongoose";

const CartsSchema = Schema({
    products:[

        {
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
            
        },
        quantity:{
            type:Number,
            // required:true,
            integer:true

        }

    }

]
})


export default model ('carts', CartsSchema)