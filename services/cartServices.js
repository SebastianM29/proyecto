import { addProductToCart,
         createCart, 
         deleteCart, 
         deleteProductsOfCart, 
         getAllcarts, 
         getCartById, 
         putAllOfcart, 
         putQuantityIdCart } from "../persistence/cartData.js"

export const getAllTheCarts = async() => {
    const value = await getAllcarts()
    return value
}

export const getTheCartById = async(id) =>{
    const value = await getCartById(id) 
    return value
}

export const createTheCart = async() => {
    const value = await createCart()
    return value
}
export const addProductToTheCart = async(cid,pid) => {
const value = await addProductToCart(cid,pid)
return value
}

export const deleteProductsOfTheCart = async (cid,pid) => {
    const value = await deleteProductsOfCart(cid,pid)
    return value
}
export const putAllOfTheCart = async(cid,array) => {
    const value = await putAllOfcart(cid,array)
    return value
    
}

export const putQuantityIdInCart = async (cid,pid,quantity) => {
    const value = await putQuantityIdCart(cid,pid,quantity)
    return value
}

export const deleteIdThisCart = async (cid) => {
    const value = await deleteCart(cid)
    return value
}