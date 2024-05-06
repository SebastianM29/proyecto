import winston from "winston";

const customLevelOptions = {
    levels:{
        error:0,
        warning:1,
        info:2,
        http:3,
        verbose:4,
        debug:5,
        silly: 6

    },
    colors:{
        error:"red",
        warning:"magenta",
        info:"yellow",
        http:"blue",
        verbose: "cyan",
        debug:"green",
        silly: "yellow"
    }
}



export const testingLogger = winston.createLogger({
    levels:  customLevelOptions.levels,
    /** CREANDO NUESTRO LOGGER transportado tipo consola level http */
    //** SISTEMAS DE NIVELES.... DEBUG,HTTP,INFO,WARNING,ERROR,FATAL */
    transports: [
        /** nivel consola */
        new winston.transports.Console({
            level:"debug",
            format: winston.format.combine(
                    winston.format.colorize({colors:customLevelOptions.colors}),
                    winston.format.simple()
            ),
            }),
        
              /** nivel archivo */
              new winston.transports.File({
                filename:'./testErrors.log',
                level:"debug",
                format: winston.format.simple()
               }
            )
    
      

    ]
})

winston.addColors(customLevelOptions.colors)

Object.keys(customLevelOptions.levels).forEach((level)=>{
  testingLogger[level] = function(message) {
    this.log({
    level: level , 
    message: message
    })
  }  
})

