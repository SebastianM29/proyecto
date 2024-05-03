import winston from "winston";

const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors:{
        fatal:"red",
        error:"magenta",
        warning:"yellow",
        info:"blue",
        http: "yellow",
        debug:"white"

    }
}



export const devLogger = winston.createLogger({
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
      

    ]
})

winston.addColors(customLevelOptions.colors)

Object.keys(customLevelOptions.levels).forEach((level)=>{
  devLogger[level] = function(message) {
    this.log({
    level: level , 
    message: message
    })
  }  
})

