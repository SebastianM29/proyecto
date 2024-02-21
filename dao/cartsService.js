
import  fs  from "fs";



export class CartService {
    constructor(path) {

        this.path=path

    }



    static async addCart(path){
        let newValue = 0
        let dataParse 

         try {
            try {
                await fs.promises.access(`${path}.json`, fs.constants.F_OK)
                const dat = await fs.promises.readFile(`${path}.json`,'utf-8')
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
                id: newValue += 1,
                products : []
            }

            dataParse.push(newCart);
            const cartsArrayStrings = JSON.stringify(dataParse,null,2);
            await fs.promises.writeFile(`${path}.json`,cartsArrayStrings)
            return {
                msg:'carrito agregado',
                obj:dataParse
            }


         } catch (error) {

             console.log(error)
            throw error
            
         }

    }

    async cartsById (id) {
        try { 
            
            const cartsId = await fs.promises.readFile(`${this.path}.json`,'utf-8')
           
            const cartsIdParse = JSON.parse(cartsId)
            const findCartsId = cartsIdParse.find(element => element.id === id)
            console.log(findCartsId)

            return findCartsId ? findCartsId : `no existe el id: ${id}`
            
        } catch (error) {
            
            console.log(error)
            throw error
            
        }
      
    }

 
    async addProductCart (productId,cartId) {
        try {
            
             let productIdAndQuantity = {
                 id:'',
                 quantity: 0
            }
            
            const carts = await fs.promises.readFile(`${this.path}.json`,'utf-8')
            const cartsParse = JSON.parse(carts)
            const findCarts = cartsParse.findIndex(element => element.id === cartId)
            

             //si se encuentra el carrito:
            if (findCarts !== -1) {
                  
                  
                  //se procede a buscar el producto
                  const products = await fs.promises.readFile(`./productos.json`,'utf-8')
                  const productsParse= JSON.parse(products)
                  const findProductsById = productsParse.find(element => element.id === productId)
                  //se evalua de manera dinamica ya q se sabe el indice del carrito, ahora falta averiguar si existe un id ya agregado del producto y evaluar
                  const cartIndexFind = cartsParse[findCarts].products.findIndex(products => products.id === productId)
                  
                   //si existe el producto..
                  if (findProductsById) {
                      //si existe en el carrito se aumenta 
                      if (cartIndexFind !== -1) {
                        console.log('entrando si son id iguales del carts')
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
                      await fs.promises.writeFile(`${this.path}.json`,cartsParseStringify)

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