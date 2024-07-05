import mongoose from "mongoose";
import  config  from "../config/config.js";
import { dbConnection } from "../db/config.js";

  

 const databaseFactory =  async() => {
    let CartServiceDB;
    let ProductServiceDB;
    let UserDB;
    switch (config.persistence) {
        case "MONGO":
            try {
                await dbConnection();
  
                
                const { default: CartS} = await import('./mongo/cartsServiceBD.js');
                const { default: Prod} = await import('./mongo/productsServiceBD.js');               
                const { default: Users} = await import('./mongo/usermodelsBD.js');               
                
                CartServiceDB= CartS
                ProductServiceDB = Prod
     
                ProductServiceDB = Prod;
                UserDB = Users;
            } catch (error) {
                console.error('Error al conectar a la base de datos MongoDB:', error);
            }
            break;
        case "MEMORY":

            
        const { default: CartS} = await import('./memory/cartsService.js');
        const { default: Prod} = await import('./memory/productService.js');
        CartServiceDB= CartS
        ProductServiceDB = Prod
  
            break
        default:
            console.error('Tipo de persistencia no soportado:', config.persistence);
            break;
    }
    return {CartServiceDB,ProductServiceDB,UserDB}
}
const{CartServiceDB,ProductServiceDB,UserDB} = await databaseFactory()





export {
    CartServiceDB,
    ProductServiceDB,
    UserDB,
    databaseFactory
}