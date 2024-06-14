import fs from "fs-extra";
import path, { dirname } from "path";
import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import { generateErrorInfo } from "../../services/errors/info.js";
import  products  from "./models/productsModels.js";
import { fileURLToPath } from "url";

const __filename =  fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)





export default class ProductServiceDB {
   constructor(){
        
       
      
    }
     
    async getProducts({limits,pages,categoria,ordering,status}){
        let filtro = {}
        let resultadoOrdering = ordering
        try {
           
            const parseValue = JSON.parse(limits)
            const parsePages = JSON.parse(pages)
           
             //validar q exista
            if(categoria && Object.keys(categoria).length > 0){
                filtro.category = categoria
            }
            if (status === 'true') {
                filtro.status = true;
            } else if (status === 'false') {
                filtro.status = false;
            }

            if(ordering === 'asc'){
              resultadoOrdering ={price:1}
            }
            if(ordering === 'desc'){
                resultadoOrdering={price:-1}
            }
        const paginate =await products.paginate(filtro,{limit:parseValue,page:parsePages,sort:resultadoOrdering, lean: true})
        return paginate
                
        } catch (error) {
            console.log(error.message)
            return 'Sin Datos en el archivo'
        }
    }
    /** TERMINADO */
    async addProduct(obj){
   
            if (![obj.category, obj.title, obj.description, obj.price, obj.code, obj.stock].every(Boolean) ) {
                console.log('vavio');
                 const error = new CustomError(
                     "(E)Error Creacion producto",
                     "(C)Datos incompletos",
                     "(M)Error: Datos insuficientes para crear el producto.",
                     EErrors.ROUTING_ERROR
                    );
                    throw error
                    
                    
                }
                console.log('objeto en la clase productop',obj);
                
                return await products.create(obj)
            
                

        }
        
        /** TERMINADO */
        async deleteProducts(id){
           
                
                const prodFind = await products.findById(id)
                if (!prodFind) {
                    console.log('eliinando');
                    const error = new CustomError(
                        "Error  eliminar datos",
                        "consulte ID",
                        "Error: ID.",
                        EErrors.NOT_FOUND
                      );
                      throw error
                }
                console.log(__dirname);
                console.log(prodFind.thumbnail);
                await fs.unlink( path.join(__dirname,'../../public',prodFind.thumbnail)  )
                
                await products.findByIdAndDelete(id)
                return prodFind

         
        }
  

        /** TERMINADO */
        async getProductById(id) {
       
           const prodFind = await products.findById(id)
           if (!prodFind) {
            console.log('no existe id');
            const error = new CustomError(
                "Error ID no valido",
                "Inexistente ID",
                "Error: Datos inexistentes para encontrar el producto.",
               EErrors.NOT_FOUND
              );
              throw error
           }
           return prodFind
     
    }


    

      async updateProducts(id,update){
        
            const prodFind = await products.findById(id)
            if (!prodFind) {
                const error = new CustomError(
                    "Error inexistente ID",
                    "Inexistente ID",
                    "Error: Datos inexistentes para actualizar el producto.",
                   EErrors.NOT_FOUND
                  );
                  throw error
                
            }
            const updProducts = await products.findByIdAndUpdate(id,update,{new:true})
            return {
                producto:prodFind,
                actualizado:updProducts
            }
            


      
    }
}


