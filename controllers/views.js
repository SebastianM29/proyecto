import { request,response } from "express";


export const viewRegister =  (req = request ,res = response)=> {
    res.render('register')
   
}

export const viewLogin = (req,res)=> {
    res.render('login')
   
}

export const viewProfile = (req,res)=>{

    const{first_name,last_name,age,email}=req.session.user
    const info = {
        first_name,
        last_name,
        age,
        email
    }
    
    res.render('profile',{info})

}