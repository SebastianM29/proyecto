import { request,response } from "express";
import  ProductServiceDB  from "../dao/mongo/productsServiceBD.js";
import  products  from "../dao/mongo/models/productsModels.js";
import  CartServiceDB  from "../dao/mongo/cartsServiceBD.js";
import CustomError from "../services/errors/CustomError.js";
import { deleteTheProduct, getAllProducts, getProductById, postCreateTheProduct, putProductsById } from "../services/productServices.js";
import { generateErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import { generateProducts } from "../helpers/generateProducts.js";


const allProducts = new ProductServiceDB()
const cart = new CartServiceDB()

export const getProd = async(req=request,res=response) => {
    
    let array = []
    let contador = 0
    const {first_name,role,carts} = req.session.user

    console.log('debo ver el id', carts)
    //limit page ,categoria, productos , sort
    const limits = req.query.limit || "9"
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

    const respDB  =await getAllProducts(obj)

    

    
    respDB.prevLink = respDB.hasPrevPage ? `http://localhost:3000/?page=${respDB.prevPage}`: ''

    respDB.nextLink = respDB.hasNextPage ? `http://localhost:3000/?page=${respDB.nextPage} `: ''
    // res.json(respDB)
    
    //respDB.IsValid = (respDB.page > 0 && respDB.page <= respDB.totalPAges) otra opcion
    //filtrar el id del carrito que necesito
   
    
    const objSession = {
        first_name,
        role
    }

    respDB.role = role
    respDB.isValid = !(respDB.page <= 0 || respDB.page > respDB.totalPAges)
    console.log('debo ver respdb',respDB.role)
     
   
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

     let respDB =await  getAllProducts(obj)

    res.json(respDB)
    
  

}
/** delet mocks */
export const mocking = (req,res) => {
    try {
        
        let prod = []

        for (let i = 0; i < 100; i++) {
           
           const value = generateProducts()
           
           prod.push(value)
           }


    res.json(prod)
        
    } catch (error) {
        console.log(error.message)
    }
 

}
/** cambiar luego */
export const getProductsPorId = async(req=request,res=response,next) => {
    try {
        console.log('entrando');
        const id = req.params.id
        const resp = await getProductById(id)
        console.log('entrando este es el id',resp);
    
        res.json({
                msg: 'producto entcontrado',
                productos: resp           
                })
    } catch (error) {
        next(error)
    }
    
       
     

}



/** cambiar luego */
export const postProducts = async(req=request,res=response,next) => {


    try {
     

     
            const resp = req.body
            const prod = await postCreateTheProduct(resp)
          
        res.json({
                msg: 'desde products: Post',
                prod
                
        })
        
    } catch (error) {
        next(error)
    }


    
}




/** cambiar luego */
export const deleteProducts = async(req=request,res=response,next) => {
   

    try {
        const id = req.params.id 
       
       const resp = await deleteTheProduct(id)
    
        
        res.json({
          msg:'producto eliminado',
          producto:resp
                   
          })
       
    } catch (error) {
        next(error)
    }
    
     
 

}




export const putProducts = async(req=request,res=response,next) => {
   try {
    
       const id = req.params.id 
       const valueUpd = req.body
      
       const resp = await putProductsById(id,valueUpd)
        
        res.json({
          msg:'producto actualizado',
          resp
                   
          })
       
     
   } catch (error) {
    
        next(error)
    
    
   }

}

export const fail = (req,res) => {
  res.render('fail')
}