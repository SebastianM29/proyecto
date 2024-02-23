import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        mongoose.connect("mongodb+srv://zevaz:BCx8XolgC60yQZ8E@pf.jtreerf.mongodb.net/proyectoFinal?retryWrites=true&w=majority&appName=pf")
        console.log('conectado a la base de datos')
    } catch (error) {
        console.log('Error al iniciar la base de datos',error)
        
    }
}