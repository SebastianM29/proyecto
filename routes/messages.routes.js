import { Router } from "express";
import { getMessages } from "../controllers/messages.js";
const router = Router()

router.get('/chat',getMessages)





export default router