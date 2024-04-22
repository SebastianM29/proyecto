import { Schema,model } from "mongoose";

const TicketSchema = new Schema({
    code:{ 
      type : String,
      required:[true,'code obligatorio']
    },
    purchase_datetime:{ 
        type : String,
        required:[true,'purchase obligatorio']
    },
    amount:{ 
        type : String,
        required:[true,'amount obligatorio']
    },
    purchaser:{ 
        type : String,
        required:[true,'purchaser obligatorio/unico'],
       
        
    }


 

}
)



export default model ('Ticket', TicketSchema)