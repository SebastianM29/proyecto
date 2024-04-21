import { Schema,model } from "mongoose";

const TicketSchema = new Schema({
    code:{ 
      type : String,
      required:[true,'nombre obligatorio']
    },
    purchase_datetime:{ 
        type : String,
        required:[true,'apellido obligatorio']
    },
    amount:{ 
        type : String,
        required:[true,'apellido obligatorio']
    },
    purchaser:{ 
        type : String,
        required:[true,'correo obligatorio/unico'],
        unique:true
        
    }


 

}
)



export default model ('Ticket', TicketSchema)