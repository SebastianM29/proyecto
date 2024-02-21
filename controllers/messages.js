import { request,response } from "express";



export const getMessages = (req=request,res=response) => {
    res.render('chat')
}