import { Schema,model } from "mongoose";

const MessageSchema = Schema({
    user:{
        type: [String],
        required:[true , 'producto obligatorio']

    },
    message:{
        type: [String],
        required:[true , 'producto obligatorio']

    }
})


export default model ('mess', MessageSchema)