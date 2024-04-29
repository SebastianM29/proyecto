// export default class CustomError {
//     static createError({name="Error",cause,message,code=1})  {
        
//         const error = new Error(message)
//         error.name = name
//         error.code = code
//         error.cause = cause
    
        

//         // console.log('entra a custom?',error.name,error.cause,error.message,error.code);        
//         throw error;
//     }
// }

export default class CustomError extends Error{
    constructor(name="Error",cause,message,code=1)  {
        
        super(message)
        this.name = name
        this.cause = cause
        this.code = code
    
        

        // console.log('entra a custom?',error.name,error.cause,error.message,error.code);        
        Error.captureStackTrace(this,this.constructor)
    }
}