import { addProductToCart,
         createCart, 
         deleteCart, 
         deleteProductsOfCart, 
         getAllcarts, 
         getCartById, 
         putAllOfcart, 
         putQuantityIdCart } from "../persistence/cartData.js"

export const getAllTheCarts = async() => {
    return await getAllcarts()
}

export const getTheCartById = async(id) =>{
    return await getCartById(id) 
}

export const createTheCart = async() => {
    return await createCart()
}
export const addProductToTheCart = async(cid,pid,productStock) => {
    return await addProductToCart(cid,pid,productStock)

}

export const deleteProductsOfTheCart = async (cid,pid) => {
    return await deleteProductsOfCart(cid,pid)
}
export const putAllOfTheCart = async(cid,array) => {
    return await putAllOfcart(cid,array)
    
}

export const putQuantityIdInCart = async (cid,pid,quantity) => {
    return await putQuantityIdCart(cid,pid,quantity)
}

export const deleteIdThisCart = async (cid) => {
    return await deleteCart(cid)
}