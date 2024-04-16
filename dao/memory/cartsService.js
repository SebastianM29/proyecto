
import  fs  from "fs";
import ProductServiceDB from "./productService.js";



export default  class CartServiceDB {
    constructor() {

        

    }
    static path = 'carts'



    static async addCart(){
        let newValue = 0
        let dataParse 

         try {
            try {
                await fs.promises.access(`${CartServiceDB.path}.json`, fs.constants.F_OK)
                const dat = await fs.promises.readFile(`${CartServiceDB.path}.json`,'utf-8')
                const data =JSON.parse(dat)
                console.log(typeof data)
                dataParse = data
            } catch (error) {
                
                console.log('no hay dato')
                dataParse=[]
                
            }
           
            for (const value of dataParse) {
                if (value.id > newValue) {
                    newValue = value.id
                }
                
            }

            let newCart = {
                products : [],
                id: newValue += 1
            }

            dataParse.push(newCart);
            const cartsArrayStrings = JSON.stringify(dataParse,null,2);
            await fs.promises.writeFile(`${CartServiceDB.path}.json`,cartsArrayStrings)

            return newCart


         } catch (error) {

             console.log(error)
            throw error
            
         }

    }

    async cartAll (){
        try {
            const cartsId = await fs.promises.readFile(`${CartServiceDB.path}.json`,'utf-8')
            const cartsParse = JSON.parse(cartsId)
            console.log(cartsParse)
            return cartsParse 
            
        } catch (error) {

            return error.message
            
        }
    }




    async cartsById (id) {
        try { 
            
            
            const cartsId = await fs.promises.readFile(`${CartServiceDB.path}.json`,'utf-8')
           
            const cartsIdParse = JSON.parse(cartsId)
            console.log('veo cartIdParse?',cartsIdParse)
            
            const idParse = JSON.parse(id)
          
            for (const ob  of cartsIdParse) {
                console.log('no entra al of?',ob.id)
                console.log(idParse)

                if (ob.id === idParse) {
                    return ob.id
                 }
            }

            return `No existe el id ${id}`
       

            // return findCartsId ? findCartsId : `no existe el id: ${id}`
            
        } catch (error) {
            
            console.log(error)
            throw error
            
        }
      
    }

  /*TODO: seguir con addProductCart */ 
 
    async addProductCart (cartId,productId) {
        try {
            
             let productIdAndQuantity = {
                 id:'',
                 quantity: 0
            }
            
            const carts = await fs.promises.readFile(`${CartServiceDB.path}.json`,'utf-8')
            const cartsParse = JSON.parse(carts)
            const findCarts = cartsParse.findIndex(element => element.id === JSON.parse(cartId))
            console.log('indice del carrito',findCarts)
            
            
            //si se encuentra el carrito:
            if (findCarts !== -1) {
                
                
                //se procede a buscar el producto
                const products = await fs.promises.readFile(`${ProductServiceDB.path}.json`,'utf-8')
                const productsParse= JSON.parse(products)
                const findProductsById = productsParse.find(element => element.id === JSON.parse(productId))
                console.log('este es el producto encontrado',findProductsById)
                //se evalua de manera dinamica ya q se sabe el indice del carrito, ahora falta averiguar si existe un id ya agregado del producto y evaluar
                const cartIndexFind = cartsParse[findCarts].products.findIndex(product => product.id === productId)
                console.log('este es el carro encontrado',cartIndexFind)
                  
                   //si existe el producto..
                  if (findProductsById) {
                      console.log('entrando si existe el producto',findProductsById)
                      //si existe en el carrito se aumenta 
                      if (cartIndexFind !== -1) {
                          console.log('entrando si existe el producto se aumenta')
                        console.log(cartsParse[findCarts].products[cartIndexFind].quantity)

                        cartsParse[findCarts].products[cartIndexFind].quantity++
              

                      //si no existe en el carrito se crea y se sube mediante un push
                      }else{
                      productIdAndQuantity.id = productId;
                      productIdAndQuantity.quantity = 1
                      cartsParse[findCarts].products.push(productIdAndQuantity)
                      }
                       //grabando
                      const cartsParseStringify = JSON.stringify(cartsParse,null,3)
                      await fs.promises.writeFile(`${CartServiceDB.path}.json`,cartsParseStringify)

                      return {
                        msg: 'producto id agregado',
                        cart : cartsParse
                      }
                    }else{
                     
                      return 'producto no encontrado por id'

                    } 


              }else{
      
                 
                  return 'no se encuentra ninguno carts'
      
              } 
      
      
      
      
          
        } catch (error) {

            console.error('Error', error.message)
            throw new Error ('Error al construis carrito')
            
        }


    }
}