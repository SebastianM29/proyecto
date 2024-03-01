import { Router } from "express";
import { addPostCarts, deleteCarts, deleteOfCarts, getCartById, getCarts, getCartsAll, postCarts, putAllCarts, putQuantityCarts } from "../controllers/carts.js";
import { checkingAuth } from "../middlewares/session.js";
const router = Router()

router.get('/cart',checkingAuth,getCartById)

router.get('/carts/',getCartsAll)
router.get('/carts/:cid',getCarts)
router.post('/carts',postCarts)
router.post('/carts/:cid/products/:pid',addPostCarts)
router.put('/carts/:cid',putAllCarts)
router.put('/carts/:cid/products/:pid',putQuantityCarts)
router.delete('/carts/:cid/products/:pid',deleteOfCarts)
router.delete('/carts/:cid',deleteCarts)



export default router