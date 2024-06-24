import { Router} from "express";
import { checkingAuth } from "../middlewares/session.js";
import { getAllUsers, viewLogin, viewPremium, viewProfile, viewRegister } from "../controllers/views.js";
const router = Router()





router.get('/register',viewRegister)
router.get('/login', viewLogin)
router.get('/profile',checkingAuth,viewProfile)
router.get('/premium',viewPremium)
router.get('/AllUsers',getAllUsers)



export default router