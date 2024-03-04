import { Router} from "express";
const router = Router()
import User from "../models/usermodels.js";
import { login, logout, register } from "../controllers/sessions.js";





router.post('/register', register )
router.post('/login', login)
router.get('/logout', logout)


export default router