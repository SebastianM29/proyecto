import passport from "passport";
import  local  from "passport-local";
import GithubStrategy from "passport-github2";
import User from "../dao/models/usermodels.js";
import { createHash,compare } from "./hash.js";
import { CartServiceDB } from "../dao/cartsServiceBD.js";
import config from "../config/config.js"

const cartDB= new CartServiceDB()




const localStrategy = local.Strategy
 const initializePassport = () => {
    passport.use('register',new localStrategy(
        {passReqToCallback:true,usernameField:'email'}, async (req,username,password,done)=>{
        const {first_name,last_name,email,age,role} = req.body
            try {

                const searchUser = await User.findOne({email:username})
                
                 
                if (!searchUser) {
                   
                   if (role === 'admin'  ) {

                    if ( email === config.adminEmail && password === config.passAdmin ) {
                        const datos = {
                            first_name,
                            last_name,
                            email,
                            age,
                            password: createHash(password),
                            role
                        }
                        const userSave = await User.create(datos)
                        console.log(userSave)
                        return done(null,userSave)
                    }else{
                        console.log('utilice el mail o contraseña adecuada')
                        return done(null,false)
                    }
                    }
                if (role=== 'user') {
                    if ( email === config.adminEmail || password === config.passAdmin ){

                        console.log('mail/pass no autorizadas')
                        return done(null,false)


                    }else{
                        console.log('entrando al passport',req.body)
                          const datos = {
                            first_name,
                            last_name,
                            email,
                            age,
                            password: createHash(password),
                            role
                           }
                           const userSave = await User.create(datos)
                           console.log(userSave)
                           return done(null,userSave)
    
                    }
                    
                }
            }
                console.log('Usuario ya registrado',email)
                return done(null,false)
            } catch (error) {
                return done(error)

            }    
        }))
        passport.use('login', new localStrategy({
            passReqToCallback:true,usernameField:'email'}, async (req,username,password,done)=> {
                console.log(req.body)
                console.log('entrando a login')
                try {
                    const findUser = await User.findOne({email:username})
                   
                    if (!findUser) {
                        console.log('no existe usuario')
                        return done(null,false)
                    }
                    if (!compare(findUser,password)) {
                        console.log('contraseña incorrecta')
                        return done(null,false)
                    }
                    //si no tiene carrito ya lo creamos y asignamos el id 
                    if (!findUser.carts) {
                        console.log('no tiene carritto!!!!!!')
                        const createCart = await CartServiceDB.addCart()
                        findUser.carts = createCart._id
                        await findUser.save()

                        console.log(findUser)
                    }
                    if (findUser.carts) {
                        const findUser = await User.findOne({email:username}).populate('carts')
                        console.log('necesitaria ver el carrito que ya tiene',findUser)
                     
                        
                    }
                   
                    
                     return done (null,findUser)
                } catch (error) {
                    console.log('entra aca??')
                    return done( error)
                    
                }
            })

            )
        passport.use('github', new GithubStrategy({
            clientID: 'Iv1.fe8dbf335678a69a',
            clientSecret:'ade19ef4eb71095aa27c0891df6a065ad23af461',
            callbackURL:'http://localhost:3000/api/session/githubcallback'
            },async(accesToken,refreshToken,profile,done)=>{
             try {
                console.log('no entra ni a palo,perfil completo',profile._json.email)
                console.log('no entra ni a palo',profile._json)
                let searchEmail = profile._json.email
                let user =await User.findOne({email: searchEmail })
                if(!user) {
                    
                    const createCart = await CartServiceDB.addCart()
                  
                    // const carritoAsignado = {
                    //     id: createCart._id
                    // };
                    const carritoAsignado = createCart._id
                    

                

                    const create = {
                        first_name:profile._json.name,
                        last_name: ' ',
                        email:profile._json.email,
                        age:' ',
                        password:' ',
                        carts:carritoAsignado
                        
                    }
                    
           
                    let result = await User.create(create)
                    return done(null,result)
                }    
                    console.log('viene a usuario existente',user)
                    return done(null,user)
             } catch (error) {
                
                console.log(error)
                return done(error)
             }
            }
            
            ) )

        
        passport.serializeUser((user,done)=>{
            done(null,user.id)
        })
        passport.deserializeUser(async(id,done)=>{
            let user = await User.findById(id)
            done(null,user)
        })
}

export default initializePassport;