import  products  from "./productsModels.js";
import carts from "./cartsModels.js";


export class CartServiceDB {
    constructor() {


    }



    static async addCart(){
        
       

         try {
            console.log('aca va pasando Add cart')
            const cart = await carts.create({products:[]})
           
            return {
                msg: 'carrito creado',
                cart
            }

         } catch (error) {

             console.log(error)
            throw error
            
         }

    }

    async cartAll() {
        try {
            const resultCarts = await carts.find().populate('products.id')
            return resultCarts
            
        } catch (error) {
            return error.message
            
        }
    }


    async cartsById (id) {
        try { 
        if (id) {
            const cartsValue = await carts.findById(id)
            console.log(cartsValue)
            return cartsValue
        }
          
            
        } catch (error) {
            
           
            return  error.message
            
        }
      
    }

    async addProductCart (cartId,productId) {
        try {
            
            const [car , prod ] = await Promise.all([
                 carts.findById(cartId),
                 products.findById(productId),
            ])
            
            console.log('que se ve de product aca',prod._id.toString())
            
            const validate = car.products.find(element => element.id.toString() === prod._id.toString())
            if (validate) {
                console.log('validate',validate)
                validate.quantity += 1
                await carts.updateOne({_id:car._id},{$set: {products: car.products}})
                // const pop = await carts.findById(cartId).populate('products.id')
                // console.log('deberia ver pop',pop.products)
                // .populate('products.id')
                return car
                
                
            }else{
                console.log('no existe')
                const productToAdd = {
                    id:productId,
                    quantity:1
                }
                car.products.push(productToAdd)
                console.log('mirando el car',car)
                await carts.updateOne({_id:car._id},{$set: {products: car.products}})
                return car
            }
          

            
          
           
           
       
        } catch (error) {

             return {
                msg: 'error codigo producto/carrito',
                error:error.message}
            
        }
    }
    async deleteProducts(cid,pid){
        try {
            const cartFind = await carts.findById(cid)
            const productFind = await products.findById(pid)
            console.log('este seria el producto ' , productFind)
            if (!cartFind) {
              throw new Error ( ' No existe el carrito')
                
            }
            if (!productFind) {

              throw new Error ( ' No existe el producto en base de datos')

            }
            for (const iterator of cartFind.products) {
                if (iterator.id.toString() === productFind._id.toString()) {
                    console.log('esta adentro del if')
                    const valorDevuelto = cartFind.products.filter(element => element.id.toString() !== productFind._id.toString())
                    cartFind.products = valorDevuelto
                    // save() se puede aplicar a una instancia de un modelo, no al modelo en sí mismo.
                    cartFind.save()
                    return {
                        eliminado:productFind,
                        carrito:valorDevuelto
                    }
                }
                
            }
            return {
                msg: 'el producto ingresado no pertenece a este carrito'
            }
           
        } catch (error) {
            throw new Error (`codigo mal ingresado: ${error.message}`)
        }

    }
}