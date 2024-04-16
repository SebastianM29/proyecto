import mess from "./models/messagesModels.js";




export class Messages {
    constructor() {

    }

    async saveMessage(user,message) {
        
        try {
            const saved = {
                user,
                message
            }
            const saving = await mess.create(saved)

            
            return saving
            
        } catch (error) {
            return error.message            
        }
    
    }
    async getMessages() {

    }

}