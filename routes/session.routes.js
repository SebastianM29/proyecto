import { Router} from "express";
const router = Router()
import { login, logout, newPass, register, restore, restorePass, testUser, updPass } from "../controllers/sessions.js";
import passport from "passport";
import UserDTO from "../dao/DTOs/user.dto.js";



router.post('/register',passport.authenticate('register',{successRedirect:'http://localhost:3000/login',failureRedirect:'http://localhost:3000/register'}) )
router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
  
})
//el que usa github
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'http://localhost:3000/login'}),(req,res)=>{
    const { first_name, last_name, email, age, password, carts } = req.user;

    const cart = carts ? carts.toString() : null; // Obtén el ID del carrito como cadena de texto si existe

    // Asigna los datos desestructurados a req.session.user
   
    const info = new UserDTO({ 
        first_name,
        last_name,
        email,
        age,
        carts: cart })

    req.session.user = info;
    // console.log('nercesito verlooooo',req.session.user)
    res.redirect('/')
})

router.get('/restore', restore )
router.post('/restorePass', restorePass)
router.get('/new/:token', newPass)
router.put('/updPass', updPass)


/** PROBANDO ARTILLERY */
router.get('/api/test/user', testUser )



router.post('/login',passport.authenticate('login',{
      failureRedirect:'http://localhost:3000/login'
}), login)



router.get('/logout', logout)


export default router