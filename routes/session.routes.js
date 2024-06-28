
import multer from "multer";
import { Router} from "express";
const router = Router()
import { allUsers, changeRol, deleteUser, documentPremium, login, logout, newPass, picture, premium, register, restore, restorePass, testUser, updPass } from "../controllers/sessions.js";
import passport from "passport";
import UserDTO from "../dao/DTOs/user.dto.js";
import { storageDocuments, storagePerfil } from "../helpers/multer.js";
import UserDB from "../dao/mongo/usermodelsBD.js";
const userServ = new UserDB()

const uploadDoc = multer({storage: storageDocuments})
const uploadPicture = multer({storage: storagePerfil})



router.post('/register',passport.authenticate('register',{successRedirect:'http://proyecto-production-7bcc.up.railway.app/login',failureRedirect:'http://proyecto-production-7bcc.up.railway.app/register'}) )
router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
  
})
//el que usa github
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'http://proyecto-production-7bcc.up.railway.app/login'}),async(req,res)=>{
    const { first_name, last_name, email, age, perfilPicture, role, carts ,_id } = req.user;

    const cart = carts ? carts.toString() : null; // Obtén el ID del carrito como cadena de texto si existe
    const idUserString = _id ? _id.toString() : null
    // Asigna los datos desestructurados a req.session.user
    await userServ.getTimeUserLoggin(_id)
    const info = new UserDTO({ 
        first_name,
        last_name,
        email,
        age,
        id:idUserString,
        carts: cart ,
        role,
        perfilPicture
      })

    req.session.user = info;
    // console.log('nercesito verlooooo',req.session.user)
    res.redirect('/')
})
router.post('/login',passport.authenticate('login',{
      failureRedirect:'http://localhost:3000/login'
}), login)



router.get('/restore', restore )
router.post('/restorePass', restorePass)
router.get('/new/:token', newPass)
router.put('/updPass', updPass)
router.put('/change', changeRol)

router.get('/allusers',allUsers)

/** PROBANDO ARTILLERY */
router.get('/api/test/user', testUser )




router.post('/:id/picture',uploadPicture.single('perfilPicture'),picture)
router.post('/users/premium/:uid/documents',uploadDoc.fields([{name:'document',maxCount:1},{name:'home',maxCount:1}]),documentPremium)//va a ir actualizando a premium, subiendo los documentos que pide
router.post('/users/premium/:uid',premium)//deberia validar si el id q pasa es premium, si es premium poner "premium"


router.delete('/deleteUser',deleteUser)
router.get('/logout', logout)


export default router