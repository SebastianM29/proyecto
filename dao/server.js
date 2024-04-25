import express from "express";
import path, { dirname } from "path";
import handlebars from "express-handlebars";
import { fileURLToPath } from "url";
import  cors  from "cors";




import  cartsRoutes  from "../routes/carts.routes.js";
import  productsRoutes  from "../routes/products.routes.js";
import  sessionRoutes  from "../routes/session.routes.js";
import viewsRoutes from    "../routes/views.routes.js";
/**agregado */
import  messagesRoutes  from "../routes/messages.routes.js";




import { dbConnection } from "../db/config.js";
import MongoStore from "connect-mongo";
import  passport  from "passport";
import initializePassport from "../helpers/passportHelpers.js";
import session from "express-session";

import * as http from "http";
import { Server as SocketIoServer } from "socket.io";
/**agregado */

import config from "../config/config.js"
import { databaseFactory } from "./factory.js";
import { socketController } from "../sockets/socketControllers.js";
/** manejo de errores por middleware */
import errHandler  from "../middlewares/errors/index.js"




//import.meta.url proporciona la URL del módulo actual en formato de URL. -- fileURLToPath es una función que convierte una URL en formato de URL a una ruta de sistema de archivos.
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)


export class Server {
    constructor() {
        this.app = express()
        /**cambiado */
        //creo servidor http para socket
        this.httpServer= http.createServer(this.app);
        //info clientes conectados
        this.io = new SocketIoServer(this.httpServer);
        /**cambiado */


        this.middlewares();
        this.routes();
        this.conectionDB();
        initializePassport()
        /**agregado */
        this.sockets()
        /**agregado */
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors())
        //congif de session
        this.app.use(session({
            store:MongoStore.create({
                mongoUrl: config.mongourlsession,
                ttl:400
            }),
            secret: config.sessionKey,
            resave:true,
            saveUninitialized:true
        }))
        this.app.use(passport.initialize())
        this.app.use(passport.session())

        this.app.use(express.static(path.join(_dirname,'../public')));
        //registra el motor de plantillas Handlebars con Express
        this.app.engine('handlebars', handlebars.engine({
            helpers: {
                eq: function(a, b) {
                    return a === b;
                }
            }
        }));
        //ubicacion de las plantillas para el renderizado
        // this.app.set( path.resolve(_dirname , '../../views'));
        this.app.set('views', path.resolve(_dirname, '../views'));

        //ubicacion de las plantillas para el renderizado
        this.app.set('view engine','handlebars')
        this.app.use(errHandler)
    }
    routes(){

        this.app.use('/',cartsRoutes);
        this.app.use('/',productsRoutes);
        this.app.use('/',messagesRoutes);
        this.app.use('/api/session/',sessionRoutes);
        this.app.use('/',viewsRoutes)

    }

    sockets(){
        this.io.on('connection',(socket)=>{
            socketController(socket,this.io)
        })
    }

    
    async conectionDB(){
        // await dbConnection()
        await databaseFactory()

    }
    
    listen(){
            //para corroborar el funcionamiento ejecutar en tu local "socket.io/socket.io.js"
            this.httpServer.listen(config.port,()=>{
            console.log(`conectado al localhost ${config.port} , ProyectoFinal`)
        })

    }

}