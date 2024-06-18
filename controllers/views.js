import { request,response } from "express";


export const viewRegister =  (req = request ,res = response)=> {
    res.render('register')
   
}

export const viewLogin = (req,res)=> {
    res.render('login')
   
}

export const viewProfile = (req,res)=>{

    const{first_name,last_name,age,email,id,perfilPicture}=req.session.user
    const info = {
        first_name,
        last_name,
        age,
        email,
        id,
        perfilPicture
    }
    console.log('hjol',perfilPicture);
    
    res.render('profile',{info})

}

export const viewPremium = async (req,res) => {
    const{id,first_name,role} = req.session.user;
    const obj = {
        id,
        first_name,
        role
    }
res.render('premium',{obj})
}