import { request,response } from "express";
import { ProductServiceDB } from "../dao/productsServiceBD.js";

const prod = new ProductServiceDB()

export const getProducts = async(req=request,res=response) => {
   
    const resp = await prod.getProducts()
    
    res.json({
        msg: 'desde products: Get',
        productos: resp           
      })
}
export const getProductsPorId = async(req=request,res=response) => {
   try {
       const id = req.params.id
       const resp = await prod.getProductById(id)
       
       res.json({
           msg: 'producto entcontrado',
           productos: resp           
         })
    } catch (error) {
       res.json({
        error:error.message
       })
   }
}
export const postProducts = async(req=request,res=response) => {
    try {
        
        const resp = req.body
        const producto = await prod.addProduct(resp)
        console.log(producto)
        
        
        res.json({
            msg: 'desde products: Post',
            producto
            
        })
    } catch (error) {
        console.log('entrando a error',error.message) 
        res.status(400).json({
            msg:error.message
        })
        
        
    }
    
}
export const deleteProducts = async(req=request,res=response) => {
   try {
    
       const id = req.params.id 
       console.log(id)
       const resp = await prod.deleteProducts(id)
        
        res.json({
          msg:'producto eliminado',
          producto:resp
                   
          })
     
   } catch (error) {
    res.status(400).json({
        msg:error.message
    })
    
   }

}
export const putProducts = async(req=request,res=response) => {
   try {
    
       const id = req.params.id 
       const valueUpd = req.body
       const resp = await prod.updateProducts(id,valueUpd)
        
        res.json({
          msg:'producto actualizado',
          resp
                   
          })
     
   } catch (error) {
    res.status(400).json({

        msg:error.message
    })
    
   }

}