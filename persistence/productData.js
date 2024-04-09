import { ProductServiceDB } from "../dao/productsServiceBD.js"

const prod = new ProductServiceDB()


export const getAllProduct = async(obj) => {
const value = prod.getProducts(obj)
return value
}

export const getProductId = async (id) => {
const value = await prod.getProductById(id)
return value
}

export const postCreateProduct = async(resp)=>{
const value = await prod.addProduct(resp)
return value
}

export const deleteProduct = async(id)=> {
   const value = await prod.deleteProducts(id) 
   return value
}

export const putProduct = async(id,vu) => {
    const value = await prod.updateProducts(id,vu)
    return value
}