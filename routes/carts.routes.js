import { Router } from "express";
import { addPostCarts, getCarts, getCartsAll, postCarts } from "../controllers/carts.js";
const router = Router()

router.get('/carts/',getCartsAll)
router.get('/carts/:cid',getCarts)
router.post('/carts',postCarts)
router.post('/carts/:cid/products/:pid',addPostCarts)




export default router