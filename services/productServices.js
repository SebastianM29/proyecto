import { deleteProduct, getAllProduct, getProductId, postCreateProduct, putProduct } from "../persistence/productData.js"

export const getAllProducts = async(obj)=> {
    const value = await getAllProduct(obj)
    return value
}

export const getProductById = async(id) => {
const value = await getProductId(id)
return value
}

export const postCreateTheProduct = async(resp) => {
const value = await postCreateProduct(resp)
return value
}

export const deleteTheProduct =async(id) => {
    const value = await deleteProduct(id)
    return value
}

export const putProductsById = async (id,vu)=> {
const value= await putProduct(id,vu)
return value
}