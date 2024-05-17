import jwt from "jsonwebtoken";
import config from "../config/config.js"


export const generateToken = (id) => {
     return jwt.sign({id},config.secretWORD,{expiresIn:'20s'})
}

export const jwtVerify = (token) => {
    try {
        
        const verify = jwt.verify(token,config.secretWORD)
        return verify
    } catch (error) {
        throw error
    }
}
