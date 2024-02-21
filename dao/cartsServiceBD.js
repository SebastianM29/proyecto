import  products  from "../dao/modelsDB/productsModels.js";
import carts from "../dao/modelsDB/cartsModels.js";


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
}