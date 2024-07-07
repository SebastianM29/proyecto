import passport from "passport";
import  local  from "passport-local";
import GithubStrategy from "passport-github2";
import User from "../dao/mongo/models/usermodels.js";
import { createHash,compare } from "./hash.js";
import  CartServiceDB  from "../dao/mongo/cartsServiceBD.js";
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
                    let perfilPicture = 'perfil/algo.jpg';
                   if (role === 'admin'  ) {

                    if ( email === config.adminEmail && password === config.passAdmin ) {
                        const datos = {
                            first_name,
                            last_name,
                            email,
                            age,
                            password: createHash(password),
                            role,
                            perfilPicture
                        }
                        const userSave = await User.create(datos)
                        
                        console.log(userSave)
                        return done(null,userSave)
                    }else{
                       
                        return done(null,false)
                    }
                    }
                if (role=== 'user') {
                    if ( email === config.adminEmail || password === config.passAdmin ){

                 
                        return done(null,false)


                    }else{
                       
                          const datos = {
                            first_name,
                            last_name,
                            email,
                            age,
                            password: createHash(password),
                            role,
                            perfilPicture,
                         

                           }
                           const userSave = await User.create(datos)
                      
                        //    return done(null,false)
                           return done(null,userSave)
    
                    }
                    
                }
            }
            
                return done(null,false)
            } catch (error) {
                return done(error)

            }    
        }))
        passport.use('login', new localStrategy({
            passReqToCallback:true,usernameField:'email'}, async (req,username,password,done)=> {
                try {
                    const findUser = await User.findOne({email:username})
                   
                    if (!findUser) {
                        return done(null,false)
                    }
                    if (!compare(findUser,password)) {
                        return done(null,false)
                    }
                    //si no tiene carrito ya lo creamos y asignamos el id 
                    if (!findUser.carts) {
                        const createCart = await CartServiceDB.addCart()
                        findUser.carts = createCart._id
                        await findUser.save()

                       
                    }
                    if (findUser.carts) {
                        const findUser = await User.findOne({email:username}).populate('carts')
                     
                        
                    }
                   
                    
                     return done (null,findUser)
                } catch (error) {
                   
                    return done( error)
                    
                }
            })

            )
        passport.use('github', new GithubStrategy({
            clientID: 'Iv1.fe8dbf335678a69a',
            clientSecret:'ade19ef4eb71095aa27c0891df6a065ad23af461',
            callbackURL:config.callbackUrl
            },async(accesToken,refreshToken,profile,done)=>{
             try {
              
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
                        carts:carritoAsignado,
                        documents:[]
                    
                     
                        
                    }
                    
           
                    let result = await User.create(create)
                    return done(null,result)
                }    
                    return done(null,user)
             } catch (error) {
                
            
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