import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        mongoose.connect("mongodb+srv://zvz:PAHgqyJpvyUlwWvb@zvzecommerce.1ltihtw.mongodb.net/ecommerce?retryWrites=true&w=majority")
        console.log('conectado a la base de datos')
    } catch (error) {
        console.log('Error al iniciar la base de datos',error)
        
    }
}