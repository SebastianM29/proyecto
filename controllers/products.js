import { request,response } from "express";
import { ProductServiceDB } from "../models/productsServiceBD.js";
import  products  from "../models/productsModels.js";
import { CartServiceDB } from "../models/cartsServiceBD.js";


const prod = new ProductServiceDB()
const cart = new CartServiceDB()

export const getProd = async(req=request,res=response) => {
    
    let array = []
    let contador = 0
    const {first_name,role,carts} = req.session.user

    console.log('debo ver el id', carts)
    //limit page ,categoria, productos , sort
    const limits = req.query.limit || "10"
    const pages = req.query.page || "1"
    const categoria = req.query.category
    const ordering = req.query.ordering || {}
    const status = req.query.status
    // console.log("ruta veo status?",status)
    const obj={
        limits,
        pages,
        categoria,
        ordering,
        status
    }

    const respDB  =await prod.getProducts(obj)
        
    

    

    
    respDB.prevLink = respDB.hasPrevPage ? `http://localhost:3000/?page=${respDB.prevPage}`: ''

    respDB.nextLink = respDB.hasNextPage ? `http://localhost:3000/?page=${respDB.nextPage} `: ''
    // res.json(respDB)
    
    //respDB.IsValid = (respDB.page > 0 && respDB.page <= respDB.totalPAges) otra opcion
    //filtrar el id del carrito que necesito
   
    
    const objSession = {
        first_name,
        role
    }


     respDB.isValid = !(respDB.page <= 0 || respDB.page > respDB.totalPAges)
   
    res.render('product', {respDB,carts,objSession} );

}
export const getProducts = async(req=request,res=response) => {
    

    //limit page ,categoria, productos , sort
    const limits = req.query.limit || "10"
    const pages = req.query.page || "1"
    const categoria = req.query.category
    const ordering = req.query.ordering || {}
    const status = req.query.status
   
    const obj={
        limits,
        pages,
        categoria,
        ordering,
        status
    }

     let respDB =await  prod.getProducts(obj)

    res.json(respDB)
    
  

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
      
        
        
        res.json({
            msg: 'desde products: Post',
            producto
            
        })
    } catch (error) {
        
        res.status(400).json({
            msg:error.message
        })
        
        
    }
    
}
export const deleteProducts = async(req=request,res=response) => {
   try {
    
       const id = req.params.id 
       
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