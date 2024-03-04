






export const checkingAuth = (req,res,next) => {
    if(!req.session.user){
        //sino se ejecuta el next
       return res.redirect('/login')
    }
    next()

}


//validar si es admin para el profile