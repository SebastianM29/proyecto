// import  CartServiceDB  from "../dao/cartsServiceBD.js";

import  {CartServiceDB}  from "../dao/factory.js"



console.log('hola',CartServiceDB)
const cartDB = new CartServiceDB()

export const getAllcarts = async() => {
    const value = await cartDB.cartAll()
    return value
}
export const getCartById = async(id) => {
    const value = await cartDB.cartsById(id)
    return value
}
export const createCart = async() => {
   const value = await CartServiceDB.addCart()
   return value
}
export const addProductToCart = async (cid,pid) => {
    const value = await cartDB.addProductCart(cid,pid)
    return value
}
export const deleteProductsOfCart = async (cid,pid) => {
 const value = await cartDB.deleteProducts(cid,pid)
 return value
}
export const putAllOfcart = async(cid,array) => {
    const value = await cartDB.putAll(cid,array)
    return value
}
export const putQuantityIdCart = async (cid,pid,quantity) => {
    const value  = await cartDB.putQuantity(cid,pid,quantity)
    return value
}
export const deleteCart =  async (cid) => {
    const value = await cartDB.delCarts(cid)
    return value 
}