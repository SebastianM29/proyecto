
import multer from "multer";
import { Router} from "express";
const router = Router()
import { documentPremium, login, logout, newPass, premium, register, restore, restorePass, testUser, updPass } from "../controllers/sessions.js";
import passport from "passport";
import UserDTO from "../dao/DTOs/user.dto.js";
import { storageDocuments } from "../helpers/multer.js";

const uploadDoc = multer({storage: storageDocuments})



router.post('/register',passport.authenticate('register',{successRedirect:'http://localhost:3000/login',failureRedirect:'http://localhost:3000/register'}) )
router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
  
})
//el que usa github
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'http://localhost:3000/login'}),(req,res)=>{
    const { first_name, last_name, email, age, password, carts ,_id } = req.user;

    const cart = carts ? carts.toString() : null; // Obtén el ID del carrito como cadena de texto si existe
    const idUserString = _id ? _id.toString() : null
    // Asigna los datos desestructurados a req.session.user
   
    const info = new UserDTO({ 
        first_name,
        last_name,
        email,
        age,
        id:idUserString,
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


router.post('/users/premium/:uid/documents',uploadDoc.fields([{name:'document',maxCount:1},{name:'home',maxCount:1}]),documentPremium)//va a ir actualizando a premium, subiendo los documentos que pide
router.post('/users/premium/:uid',premium)//deberia validar si el id q pasa es premium, si es premium poner "premium"



router.get('/logout', logout)


export default router