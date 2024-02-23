import { request,response } from "express";
import { CartServiceDB } from "../models/cartsServiceBD.js";
const cartDB = new CartServiceDB()

export const getCartsAll = async(req=request,res=response) => {
    try {
        const id = req.params.cid
        const value = await cartDB.cartAll()
        res.json({
            value
        })
    } catch (error) {
        console.log(error.message)
    }
    }


export const getCarts = async(req=request,res=response) => {
try {
    const id = req.params.cid
    const value = await cartDB.cartsById(id)
    res.json({
        value
    })
} catch (error) {
    console.log(error.message)
}
}


export const postCarts = async(req=request,res=response) => {
    try {
        
            const value =  await CartServiceDB.addCart()
            res.json(value)
   
        
        
    } catch (error) {
        
       throw new Error ('Error al crear carrito')
        
    }
}
export const addPostCarts = async(req=request,res=response) => {

    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const resp = await cartDB.addProductCart(cid,pid)
     
        console.log(resp)
        res.json({
            msg:'mensaje',
            resp})
        
    } catch (error) {
        console.log(error)
        
    }
}


export const deleteOfCarts = async(req=request,res=response) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const resp = await cartDB.deleteProducts(cid,pid)
        
        res.json(resp)
        
    } catch (error) {
        res.status(404).json({
            msg:'error',
            error:error.message
        })
    }
}