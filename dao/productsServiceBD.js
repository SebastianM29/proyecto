
import  products  from "./models/productsModels.js";



export class ProductServiceDB {
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


