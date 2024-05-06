import ticket from "../mongo/models/tickets.js"


export default class Tickets {
    constructor(){

    }
    async TicketsCreate(obj) {
       
        await ticket.create(obj)
     
    }

}