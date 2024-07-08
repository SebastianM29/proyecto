// import  CartServiceDB  from "../dao/cartsServiceBD.js";

import  {CartServiceDB}  from "../dao/factory.js"



const cartDB = new CartServiceDB()

export const getAllcarts = async() => {
    return await cartDB.cartAll()
    
}
export const getCartById = async(id) => {
    return await cartDB.cartsById(id)
    
}
export const createCart = async() => {
   return await CartServiceDB.addCart()
   
}
export const addProductToCart = async (cid,pid,productStock) => {
    return await cartDB.addProductCart(cid,pid,productStock)
    
}
export const deleteProductsOfCart = async (cid,pid) => {
 return await cartDB.deleteProducts(cid,pid)
 
}
export const putAllOfcart = async(cid,array) => {
    return await cartDB.putAll(cid,array)
    
}
export const putQuantityIdCart = async (cid,pid,quantity) => {
    return await cartDB.putQuantity(cid,pid,quantity)
    
}
export const deleteCart =  async (cid) => {
    return await cartDB.delCarts(cid)
     
}