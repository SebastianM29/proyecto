import config from "../config/config.js"
import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        mongoose.connect(config.mongourl)
        console.log('conectado a la base de datos')
    } catch (error) {
        console.log('Error al iniciar la base de datos',error)
        
    }
}