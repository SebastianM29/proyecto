import { request,response } from "express";

import  ProductServiceDB  from "../dao/mongo/productsServiceBD.js";
import  products  from "../dao/mongo/models/productsModels.js";
import  CartServiceDB  from "../dao/mongo/cartsServiceBD.js";
import CustomError from "../services/errors/CustomError.js";
import { deleteTheProduct, getAllProducts, getProductById, postCreateTheProduct, putProductsById } from "../services/productServices.js";
import { generateErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import { generateProducts } from "../helpers/generateProducts.js";
import { notifyUserDeleteProduct } from "../helpers/nodemailer.js";


const allProducts = new ProductServiceDB()
const cart = new CartServiceDB()

/** APLICADO LOGGER */
export const getProd = async(req=request,res=response) => {
    
    let array = []
    let contador = 0
    const {first_name,role,carts} = req.session.user
    if (req.logger.debug) {
        req.logger.debug(`viendo el ID de carts, ${carts}`)
    }
       
    
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
    req.logger.info(`ROL:${respDB.role}`)
     
   
    res.render('product', {respDB,carts,objSession} );

}

/** APLICADO LOGGER */
export const getProducts = async(req=request,res=response) => {
    if (req.logger.debug) {
        req.logger.debug('Accediendo a: getProducts')
    }
       req.logger.info('Obteniendo todos los productos')
    
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
export const allLoggs = (req,res,next) => {
    try {
        req.logger.error('test error allLogs')
        req.logger.warning('test warning allLogs')
        req.logger.info('test info allLogs')
        req.logger.http('test http allLogs')
        req.logger.verbose('test verbose allLogs')
        req.logger.debug('test debug allLogs')
        req.logger.silly('test silly allLogs')
        
        res.json({msg:'llegando a allLoggs'}) 
    } catch (error) {
         console.log(error)  
    }
}







/** APLICADO LOGGER */
export const getProductsPorId = async(req=request,res=response,next) => {
    try {
        if (req.logger.debug) {
            req.logger.debug('Accediendo a: getProductByID')
        }
           req.logger.info('Obteniendo los productos por ID')
        const id = req.params.id
        const resp = await getProductById(id)
        
        res.json({
                msg: 'producto entcontrado',
                productos: resp           
                })
    } catch (error) {
        req.logger.error('Producto no encontrado por ID')
        next(error)
    }
}

/** APLICADO LOGGER */
export const postProducts = async(req=request,res=response,next) => {


    try {
        // const {id} = req.session.user
        // console.log('viendo id',id);
        if (req.logger.debug) {
            req.logger.debug('Accediendo a: postProducts')
        }
           req.logger.info('Creando productos')
           const thumbnail = "https://proyecto-production-1d58.up.railway.app/products/" + req.file.filename
           console.log('este seria el path', thumbnail);
          
           const {category,title,description,price,code,stock} = req.body
           const all = {
            category,
            title,
            description,
            price,
            code,
            stock,
            thumbnail,
            createdBy:id}

           console.log(all)
           const prod = await postCreateTheProduct(all)
           console.log('deberia ver elk resultado ??',prod);
      res.json({
        msg: 'success'
      })
        
    } catch (error) {
        req.logger.error('Error al crear producto')
        next(error)
    }
}

/** APLICADO LOGGER */
export const deleteProducts = async(req=request,res=response,next) => {
    try {
        if (req.logger.debug) {
            req.logger.debug('Accediendo a: deleteProducts')
        }
        const id = req.params.id 
           req.logger.info(`Buscando el id ${id}`)
        const resp = await deleteTheProduct(id)
        const { creatorByEmail,creatorByRole,product} = resp
        console.log('ruta delete productos',resp);
        if (creatorByEmail !== 'adminCoder@coder.com' && creatorByRole !== 'admin') {
            console.log('notioficando');
            await notifyUserDeleteProduct(creatorByEmail,product);
        }
    
        
        res.json({
          msg:'producto eliminado',
          producto:resp
                   
          })
    } catch (error) {
        req.logger.error('Error al borrar producto')
        next(error)
    }
}

/** APLICADO LOGGER */
export const putProducts = async(req=request,res=response,next) => {
   try {
    
       const id = req.params.id 
       const valueUpd = req.body
       if (req.logger.debug) {
       req.logger.debug('Accediendo a: putProducts')
    }
       req.logger.info(`Intentando actualizar ID: ${id} `)
       const resp = await putProductsById(id,valueUpd)
        
        res.json({
          msg:'producto actualizado',
          resp
                   
          })
   } catch (error) {
        req.logger.error('Error al actualizar producto')
        next(error)
   }
}

export const fail = (req,res) => {
  res.render('fail')
}