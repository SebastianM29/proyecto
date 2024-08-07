import { request,response } from "express";
import { getAllUsersSer } from "../services/userServices.js";
import UsersDTO from "../dao/DTOs/users.dto.js";


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


export const getAllUsers = async (req,res) => {
    const{id} = req.session.user;
    const usuarios = await getAllUsersSer()
    const filtroUser =  new UsersDTO(usuarios)
 
    res.render('allUsers',{filtroUser,id})
}