import mongoose from "mongoose";
import  config  from "../config/config.js";
import { dbConnection } from "../db/config.js";

  

 const databaseFactory =  async() => {
    let CartServiceDB;
 let ProductServiceDB;
    switch (config.persistence) {
        case "MONGO":
            try {
                await dbConnection();
                console.log('Conectado a la base de datos MongoDBNOW');
                
                const { default: CartS} = await import('./mongo/cartsServiceBD.js');
                const { default: Prod} = await import('./mongo/productsServiceBD.js');
                
                CartServiceDB= CartS
                ProductServiceDB = Prod
                console.log(ProductServiceDB)
                ProductServiceDB = Prod;
            } catch (error) {
                console.error('Error al conectar a la base de datos MongoDB:', error);
            }
            break;
        case "MEMORY":

            
        const { default: CartS} = await import('./memory/cartsService.js');
        const { default: Prod} = await import('./memory/productService.js');
        CartServiceDB= CartS
        ProductServiceDB = Prod
        console.log('esto se debe ver en memoria',CartServiceDB)
            
            break
        default:
            console.error('Tipo de persistencia no soportado:', config.persistence);
            break;
    }
    return {CartServiceDB,ProductServiceDB}
}
const{CartServiceDB,ProductServiceDB} = await databaseFactory()



console.log('se ve afuera? hola productService', ProductServiceDB)

export {
    CartServiceDB,
    ProductServiceDB,
    databaseFactory
}