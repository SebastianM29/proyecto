import { request,response } from "express";
import  CartServiceDB  from "../dao/mongo/cartsServiceBD.js";
import TicketSchema from "../dao/mongo/ticketServiceDB.js";
import { addProductToTheCart, createTheCart, deleteIdThisCart, deleteProductsOfTheCart, getAllTheCarts, getTheCartById, putAllOfTheCart, putQuantityIdInCart } from "../services/cartServices.js";
import { v4 as uuidv4 }  from 'uuid'
import tickets from "../dao/mongo/models/tickets.js";
const cartDB = new CartServiceDB()
const ticketDB = new TicketSchema()

export const getCartsAll = async(req=request,res=response) => {
    try {
        // const id = req.params.cid
        const value = await getAllTheCarts()
        res.json({
            value
        })
      
    } catch (error) {
        console.log(error.message)
    }
    }

/** APLICADO LOGGER */
export const getCarts = async(req=request,res=response,next) => {
try {
    const id = req.params.cid.toString()
    if (req.logger.debug) {
        req.logger.debug('Accediendo a: getCarts')
    }
    const value = await getTheCartById(id)
    console.log('debo entrar aca ehn el getCarts',value)
    res.json(
        value
    )
} catch (error) {
    req.logger.error('Error al encontrar carrito por id')
    next(error)
}
}



/** APLICADO LOGGER */
export const getCartById = async(req=request,res=response) => {
try {
    
    const {carts} = req.session.user
    if (req.logger.debug) {
        req.logger.debug('Accediendo a: getCartById')
    }
       req.logger.info('ViendoCarrito de usuario')

    res.render('cart',{
        carts
    })
} catch (error) {
    console.log(error.message)
}
}

/** APLICADO LOGGER */
export const postCarts = async(req=request,res=response) => {
    try {
     
            const value =  await createTheCart()
            if (req.logger.debug) {
                req.logger.debug('Accediendo a: postCarts')
            }
               req.logger.info('Asignando Carrito para el usuario')
            res.json(value)
   
    } catch (error) {
        
       throw new Error ('Error al crear carrito')
        
    }
}

/** APLICADO LOGGER */
export const addPostCarts = async(req=request,res=response,next) => {

    try {
        const cid = req.params.cid
        const pid = req.params.pid
        
        const{productStock} = req.body
        if (req.logger.debug) {
            req.logger.debug(`Accediendo a: addPostCarts id Carrito:${cid} , id producto ${pid}`)
        }
           req.logger.info('Agregando producto al carrito del usuario y ejecutando compra')
        const resp = await addProductToTheCart(cid,pid,productStock)
        
        res.json({resp})
        
    } catch (error) {

      req.logger.error('Error al ingresar producto al carrito')
      next(error)
        
    }
}

/** APLICADO LOGGER */
export const deleteOfCarts = async(req=request,res=response,next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const resp = await deleteProductsOfTheCart(cid,pid)
        if (req.logger.debug) {
            req.logger.debug(`Accediendo a: deleteOfCarts id Carrito:${cid} , id producto ${pid}`)
        }
        req.logger.info('Eliminando producto del carrito del usuario')
        res.json(resp)
        
    } catch (error) {
       req.logger.error('Error al borrar el carrito')
       next(error)
    }
}
/** APLICADO LOGGER */
export const putAllCarts = async(req=request,res=response,next) => {
    try {
        const cid = req.params.cid
        const array = req.body
        if (req.logger.debug) {
            req.logger.debug(`Accediendo a: putAllCarts`)
        }
        const resp = await putAllOfTheCart(cid,array)
        res.json(resp)
        
    } catch (error) {
       req.logger.error('Error al actualizar los carritos')
       next(error)
    }
}
/** APLICADO LOGGER */
export const putQuantityCarts = async(req=request,res=response,next) => {
    try {
        console.log('este seria el path');
        const cid = req.params.cid
        const pid = req.params.pid
        if (req.logger.debug) {
            req.logger.debug(`Accediendo a: putQuantityCarts id Carrito:${cid} , id producto ${pid}`)
        }
        req.logger.info('Actualizando producto del carrito del usuario')
        const quantity = req.body

        const resp = await putQuantityIdInCart(cid,pid,quantity)

        res.json(resp)
        
    } catch (error) {
     req.logger.error('Error al actualizar las cantidades')
     next(error)
    }
}

/** APLICADO LOGGER */
export const deleteCarts = async(req=request,res=response,next) => {
    try {
        const cid = req.params.cid
        if (req.logger.debug) {
            req.logger.debug(`Accediendo a: deleteCarts`)
        }
        req.logger.info('Eliminando Carrito')

        const resp = await deleteIdThisCart(cid)

        res.json(resp)
        
    } catch (error) {
        req.logger.error('Error al borrar carrito por ID')

       next(error)
    }
}

export const purchaseCarts =  async(req,res) => {
    try {
        const {email} = req.session.user
        const cid = req.params.cid
        const{sumaAmount}=req.body
        if (req.logger.debug) {
            req.logger.debug(`Accediendo a: Generador de tickets: PURCHASE`)
        }
        const unique = uuidv4()
        req.logger.info(`viendo el ${email} y el id del carrito ${cid} , para generar el ticket ${unique}`)
        const purchase_datetime = new Date().toISOString();
        const obj = {

            code : unique,
            purchase_datetime,
            amount:sumaAmount,
            purchaser: email


        }
       ticketDB.TicketsCreate(obj)
        req.logger.http(`ticket Creado`)
        res.json({msg:cid})
    } catch (error) {
        console.log(error.message)
    }
    // const cid = req.params.cid
    // console.log( cid)
    // res.json({
    //     msg:'llegando al path de compras'})

}
export const sellCart =  async(req,res) => {
  res.render('sellCarts')

}