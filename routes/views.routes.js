import { Router} from "express";
import { checkingAuth } from "../middlewares/session.js";
const router = Router()





router.get('/register', (req,res)=> {
    res.render('register')
   
})
router.get('/login', (req,res)=> {
    res.render('login')
   
})
router.get('/profile',checkingAuth,(req,res)=>{

    const{first_name,last_name,age,email}=req.session.user
    const info = {
        first_name,
        last_name,
        age,
        email
    }
    console.log(info)
    res.render('profile',{info})

})



export default router