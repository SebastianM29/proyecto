
import  products  from "../dao/modelsDB/productsModels.js";


export class ProductServiceDB {
   constructor(){
        
       
      
    }
     
    async getProducts(limit){
        try {
           
            if (limit) {
                console.log('viendo el limit')
               
            }

           const prod = await products.find()
           return prod
                
        } catch (error) {
            return 'Sin Datos en el archivo'
        }
    }
 
    async addProduct(obj){
        try {
            
            const productoCreado = await products.create(obj)
            return productoCreado
            } catch (error) {
                if (error.code === 11000) {
                throw new Error('Codigo duplicado: debe ser unico')
                }else{
                throw error
            }
            }
        }
          
        async deleteProducts(id){
            try {
                console.log('entro a la clase?')
                const prodFind = await products.findById(id)
                console.log(prodFind)
                await products.findByIdAndDelete(id)
                return prodFind

            } catch (error) {
                throw new Error
            }
        }
        
        async getProductById(id) {
        try {
           const prodFind = await products.findById(id)
           if(!prodFind){
            return {msg:'producto no encontrado'}
           }
           return prodFind
        } catch (error) {
            throw new Error(' verifica el ID proporcionado.');
        }
    }

    

      async updateProducts(id,update){
        try {
            const prodFind = await products.findById(id)
            const updProducts = await products.findByIdAndUpdate(id,update,{new:true})
            return {
                producto:prodFind,
                actualizado:updProducts
            }
            


        } catch (error) {
            // console.error('Error', error.message)
            throw new Error ('Problema a la hora de actualizar producto')
        }
    }
}


