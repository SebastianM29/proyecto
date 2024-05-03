import winston from "winston";

const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        http:3,
        info:4,
       
    },
    colors:{
        fatal:"red",
        error:"magenta",
        warning:"yellow",
        http:"yellow",
        info:"blue",
       

    }
}


export const prodLogger = winston.createLogger({

    levels:  customLevelOptions.levels,
    /** CREANDO NUESTRO LOGGER transportado tipo consola level info */
    //** SISTEMAS DE NIVELES....INFO,WARNING,ERROR,FATAL */
    transports: [
        /** nivel consola */
         new winston.transports.Console({
            level:"info",
            format: winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        
        }),
        /** nivel archivo */
        new winston.transports.File({
            filename:'./prodErrors.log',
            level:"error",
            format: winston.format.simple()
           }
        )

    ]
})

winston.addColors(customLevelOptions.colors)

Object.keys(customLevelOptions.levels).forEach((level)=>{
  prodLogger[level] = function(message) {
    this.log({
    level: level , 
    message: message
    })
  }  
})
