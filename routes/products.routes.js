import { Router } from "express";
import { 
     allLoggs,
     deleteProducts,
     fail, 
     getProd, 
     getProducts, 
     getProductsPorId, 
     mocking, 
     postProducts, 
     putProducts } from "../controllers/products.js";
import { checkingAuth } from "../middlewares/session.js";
import { testLogger } from "../middlewares/logger.js";

const router = Router()

router.get('/',checkingAuth,getProd)
router.get('/fail',checkingAuth,fail)


router.get('/mocking',mocking)
router.get('/loggerTest',testLogger,allLoggs)

router.get('/products/',getProducts)
router.get('/products/:id',getProductsPorId)
router.post('/products',postProducts)
router.delete('/products/:id',deleteProducts)
router.put('/products/:id',putProducts)









export default router