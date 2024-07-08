import  products  from "./models/productsModels.js";
import carts from "./models/cartsModels.js";
import EErrors from "../../services/errors/enums.js";
import CustomError from "../../services/errors/CustomError.js";


export default class CartServiceDB {
    constructor() {


    }



    static async addCart(){
        
       

         try {
            const cart = await carts.create({products:[]})
           
            return cart
            

         } catch (error) {

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

   /** TERMINADO */
    async cartsById (id) {
       
        
            const cartsValue = await carts.findById(id).populate('products.id')
            if (!cartsValue) {
                 const error = new CustomError(
                        "Error acceso a carrito",
                        "consulte ID",
                        "m - Consulte su ID nuevamente",
                         EErrors.NOT_FOUND
                      );
                      throw error
            }
            return cartsValue
      
          
            
     
      
    }
 
    /** TERMINADO */
    async addProductCart (cartId,productId,productStock) {
       
            
            const [car , prod ] = await Promise.all([
                 carts.findById(cartId),
                 products.findById(productId),
            ])

            if (!car) {
                const error = new CustomError(
                    "Error  al encontrar Carrito",
                    "consulte ID",
                    "Error: ID.",
                    EErrors.NOT_FOUND
                  );
                  throw error
            }
            if (!prod) {
                const error = new CustomError(
                    "Error al encontrar producto ",
                    "consulte ID",
                    "Error: ID.",
                    EErrors.NOT_FOUND
                  );
                  throw error
            }

            
            if (prod.stock === 0 || productStock > prod.stock) {
       
               const resp = prod._id.toString()
                throw new Error (prod)
            }
    
            const validate = car.products.find(element => element.id.toString() === prod._id.toString())
            if (validate) {

                
                if (prod.stock>0) {
                    prod.stock -= productStock
                    
                }

                validate.quantity += 1
                await carts.updateOne({_id:car._id},{$set: {products: car.products}})
                await prod.save()
               
               
                return car
                
                
            }else{
                if (prod.stock>0) {
                    prod.stock -= 1
                    
                }
               
                
                const productToAdd = {
                    id:productId,
                    quantity:1
                }
                car.products.push(productToAdd)
                
                await carts.updateOne({_id:car._id},{$set: {products: car.products}})
                await prod.save()

                return prod._id.toString()
            }
          

            
          
           
           
       
    }
    /** TERMINADO */
    async deleteProducts(cid,pid){
       
            const cartFind = await carts.findById(cid)
            const productFind = await products.findById(pid)
            
            if (!cartFind) {
                const error = new CustomError(
                    "Error  al encontrar Carrito",
                    "consulte ID",
                    "Error: ID.",
                    EErrors.NOT_FOUND
                  );
                  throw error
                
            }
            if (!productFind) {

                const error = new CustomError(
                    "(E)Error al encontrar producto ",
                    "consulte ID",
                    "Error: ID.",
                    EErrors.NOT_FOUND
                  );
                  throw error

            }
            for (const iterator of cartFind.products) {
                if (iterator.id.toString() === productFind._id.toString()) {
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
           
     
    }
    /** TERMINADO */
    async putAll(cid,arrayCarts){
      
            const cart = await carts.findById(cid)
            if (!cart) {
                const error = new CustomError(
                    "(E)Error al actualizar productos en el carrito ",
                    "(C)consulte ID",
                    "(M)Error: ID - Carrito.",
                    EErrors.NOT_FOUND
                  );
                  throw error
            }
            cart.products = []
            for (const iterator of arrayCarts) {
                const prodExist = await products.findById(iterator.id)
                if (!prodExist) {
                    const error = new CustomError(
                        "Error al encontrar producto en el carrito",
                        "consulte ID del producto",
                        "Error: ID - producto",
                        EErrors.NOT_FOUND
                      );
                      throw error
                }
                const obj = {
                    id : iterator.id,
                    quantity: iterator.quantity
                }
                cart.products.push(obj)
                await cart.save()

            }
            return {
                msg:"actualizado",
                cart
            }
        

            
            
        
    }
     /** TERMINADO */
    async putQuantity(cid,pid,quantity){
       
       
      
        
            const cart = await carts.findById(cid)
            const prodExist = await products.findById(pid)
            
            if (!cart) {
                const error = new CustomError(
                    "(E-N)Error al actualizar el carrito ",
                    "(C)consulte ID",
                    "(M)Error: ID - Carrito.",
                    EErrors.NOT_FOUND
                  );
                  throw error
            }

            if (!prodExist) {
                const error = new CustomError(
                    "(E-N)Error al actualizar productos - no se encuentra ",
                    "(C)consulte ID",
                    "(M)Error: ID - Carrito.",
                    EErrors.NOT_FOUND
                  );
                  throw error
                
            }


            const filterProd = cart.products.filter(element => element.id.toString() === prodExist._id.toString())

            
            if (filterProd.length !== 0) {
                // filterProd.quantity = quantity
                filterProd[0].quantity = quantity.quantity
                await cart.save()
                return cart
            }else{
                return 'no se encontro producto en el carro seleccionado' 
            }
         
       
      
    }
    /** TERMINADO */
    async delCarts(cid){
        //otra opcion
        // const result = await carts.updateOne(
        //     { _id: cid },
        //     { $set: { products: [] } }
        // );
    
        // if (result.nModified === 0) {
        //     throw new Error('No se pudo encontrar el carrito');
        // }
       
       
        
            const cart = await carts.findById(cid)
            if (!cart) {
                const error = new CustomError(
                    "(E-N)no existe el carrito ",
                    "(C)consulte ID",
                    "(M)Error: ID - Carrito.",
                    EErrors.NOT_FOUND
                  );
                  throw error
            }
            

            if (cart.products.length === 0) {
                const error = new CustomError(
                    "(E-N)no existe el carrito ",
                    "(C)consulte ID",
                    "(M)Error: no existe ningun producto en el carrito.",
                    EErrors.NOT_FOUND
                  );
                  throw error 

                
            }
            cart.products = []
            await cart.save()

           return {
            msg: ' formateado con exito productos',
            cart
           }
       
     
    }
}