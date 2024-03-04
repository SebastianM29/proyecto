import { Router} from "express";
import { checkingAuth } from "../middlewares/session.js";
import { viewLogin, viewProfile, viewRegister } from "../controllers/views.js";
const router = Router()





router.get('/register',viewRegister)
router.get('/login', viewLogin)
router.get('/profile',checkingAuth,viewProfile)



export default router