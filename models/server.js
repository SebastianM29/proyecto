import express from "express";
import path, { dirname } from "path";
import handlebars from "express-handlebars";
import { fileURLToPath } from "url";
import  cors  from "cors";




import  cartsRoutes  from "../routes/carts.routes.js";
import  productsRoutes  from "../routes/products.routes.js";
import { dbConnection } from "../db/config.js";




//import.meta.url proporciona la URL del módulo actual en formato de URL. -- fileURLToPath es una función que convierte una URL en formato de URL a una ruta de sistema de archivos.
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)


export class Server {
    constructor() {
        this.app = express()
    
        

        this.middlewares();
        this.routes();
        this.conectionDB();
    

    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors())

        this.app.use(express.static(path.join(_dirname,'../public')));
        //registra el motor de plantillas Handlebars con Express
        this.app.engine('handlebars',handlebars.engine());
        //ubicacion de las plantillas para el renderizado
        this.app.set(path.resolve(_dirname,'../views'));
        //ubicacion de las plantillas para el renderizado
        this.app.set('view engine','handlebars')

    }
    routes(){

        this.app.use('/',cartsRoutes);
        this.app.use('/',productsRoutes);

    }

    async conectionDB(){
        await dbConnection()

    }
    listen(){
            //para corroborar el funcionamiento ejecutar en tu local "socket.io/socket.io.js"
            this.app.listen('3000',()=>{
            console.log('conectado al localhost 3000 , proyectoFinal')
        })

    }

}