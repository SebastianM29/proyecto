import { Router } from "express";
import { deleteProducts, getProd, getProducts, getProductsPorId, postProducts, putProducts } from "../controllers/products.js";
const router = Router()

router.get('/',getProd)

router.get('/products/',getProducts)
router.get('/products/:id',getProductsPorId)
router.post('/products',postProducts)
router.delete('/products/:id',deleteProducts)
router.put('/products/:id',putProducts)





export default router