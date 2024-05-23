import path, { dirname } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";



const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)


export const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:"Documentacion desarrollo Ecommerce",
            version:"1.0.0",
            description:"API SWAGGER"
        }
    },
    apis: [`${path.join(_dirname,"../docs/**/*.yaml")}`]
}

export const swaggerSpecs = swaggerJSDoc(swaggerOptions)