import  products  from "./models/productsModels.js";
import carts from "./models/cartsModels.js";


export default class CartServiceDB {
    constructor() {


    }



    static async addCart(){
        
       

         try {
            console.log('aca va pasando Add cart')
            const cart = await carts.create({products:[]})
           
            return cart
            

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
            const cartsValue = await carts.findById(id).populate('products.id')
            console.log('populate',cartsValue)
            return cartsValue
        }
          
            
        } catch (error) {
            
           
            return  error.message
            
        }
      
    }

    async addProductCart (cartId,productId,productStock) {
        try {
            
            const [car , prod ] = await Promise.all([
                 carts.findById(cartId),
                 products.findById(productId),
            ])
            console.log(`car: ${car} , products: ${prod}`)
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
                // const pop = await carts.findById(cartId).populate('products.id')
                // console.log('deberia ver pop',pop.products)
                // .populate('products.id')
                // const resp = prod._id.toString()
               
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
          

            
          
           
           
       
        } catch (error) {

             throw new Error ( `${error.message}` )
            
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

    async putAll(cid,arrayCarts){
        try {
            console.log('put all products',cid,'y el body!!!!',arrayCarts)
            const cart = await carts.findById(cid)
            cart.products = []
            console.log('cart encontrado!!!',cart)
            for (const iterator of arrayCarts) {
                console.log('viendo idividual individual', iterator)
                const prodExist = await products.findById(iterator.id)
                if (!prodExist) {
                    throw new Error ('el id del producto no existe')
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
        } catch (error) {

            throw new Error (`Error : ${error.message}`)
            
        }
    }
    async putQuantity(cid,pid,quantity){
       
        try {
        
            const cart = await carts.findById(cid)
            const prodExist = await products.findById(pid)
            
            console.log('deberia ver el cart ',cart.products)
            console.log('deberia ver el producto ',prodExist)


            if (!prodExist) {
                throw new Error ('producto no existe en la base de datos carrito')
                
            }


            const filterProd = cart.products.filter(element => element.id.toString() === prodExist._id.toString())

            console.log('debo ver algo productyo encotnrado?',filterProd)
            
            if (filterProd.length !== 0) {
                // filterProd.quantity = quantity
                console.log(quantity.quantity)
                filterProd[0].quantity = quantity.quantity
                console.log('estoy en validacion ',filterProd[0].quantity)
                await cart.save()
                return cart
            }else{
                return 'no se encontro producto en el carro seleccionado' 
            }
         
       
        } catch (error) {

            throw new Error (`Error : ${error.message}`)
            
        }
    }
    async delCarts(cid){
        //otra opcion
        // const result = await carts.updateOne(
        //     { _id: cid },
        //     { $set: { products: [] } }
        // );
    
        // if (result.nModified === 0) {
        //     throw new Error('No se pudo encontrar el carrito');
        // }
       
        try {
        
            const cart = await carts.findById(cid)
            if (!cart) {
                throw new Error ('carrito inexistente') 
            }
            

            if (cart.products.length === 0) {
                throw new Error ('no existe ningun producto en el carrito')
                
            }
            cart.products = []
            await cart.save()

           return {
            msg: ' formateado con exito productos',
            cart
           }
       
        } catch (error) {

            throw new Error (`Error : ${error.message}`)
            
        }
    }
}