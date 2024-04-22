import { request,response } from "express";
import  CartServiceDB  from "../dao/mongo/cartsServiceBD.js";
import { addProductToTheCart, createTheCart, deleteIdThisCart, deleteProductsOfTheCart, getAllTheCarts, getTheCartById, putAllOfTheCart, putQuantityIdInCart } from "../services/cartServices.js";
const cartDB = new CartServiceDB()

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


export const getCarts = async(req=request,res=response) => {
try {
    const id = req.params.cid.toString()
    console.log('debo entrar aca ehn el getCarts id',id)

    const value = await getTheCartById(id)
    console.log('debo entrar aca ehn el getCarts',value)
    res.json(
        value
    )
} catch (error) {
    console.log(error.message)
}
}
//render
export const getCartById = async(req=request,res=response) => {
try {
    
    const {carts} = req.session.user
    
    console.log('este es el carrito',carts)
    


    res.render('cart',{
        carts
    })
} catch (error) {
    console.log(error.message)
}
}


export const postCarts = async(req=request,res=response) => {
    try {
          
            const value =  await createTheCart()
            res.json(value)
   
        
        
    } catch (error) {
        
       throw new Error ('Error al crear carrito')
        
    }
}
export const addPostCarts = async(req=request,res=response) => {

    try {
        const cid = req.params.cid
        const pid = req.params.pid
        
        const{productStock} = req.body

        const resp = await addProductToTheCart(cid,pid,productStock)
       console.log("seria el stock",productStock)
        
        res.json({resp})
        
    } catch (error) {

        
       res.status(400).json(
       
        error.message
      )
        
    }
}


export const deleteOfCarts = async(req=request,res=response) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const resp = await deleteProductsOfTheCart(cid,pid)
        
        res.json(resp)
        
    } catch (error) {
        res.status(404).json({
            msg:'error',
            error:error.message
        })
    }
}

export const putAllCarts = async(req=request,res=response) => {
    try {
        const cid = req.params.cid
        const array = req.body
        const resp = await putAllOfTheCart(cid,array)

        res.json(resp)
        
    } catch (error) {
        res.status(404).json({
            msg:'error',
            error:error.message
        })
    }
}
export const putQuantityCarts = async(req=request,res=response) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body

        const resp = await putQuantityIdInCart(cid,pid,quantity)

        res.json(resp)
        
    } catch (error) {
        res.status(404).json({
            msg:'error',
            error:error.message
        })
    }
}

export const deleteCarts = async(req=request,res=response) => {
    try {
        const cid = req.params.cid
      

        const resp = await deleteIdThisCart(cid)

        res.json(resp)
        
    } catch (error) {
        res.status(404).json({
            msg:'error',
            error:error.message
        })
    }
}

export const purchaseCarts =  async(req,res) => {
    try {
       
        console.log('viendo este email',req.session.user)
        const {email} = req.session.user
        console.log('viendo este email',email)
        
        console.log('entrando',cid)
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