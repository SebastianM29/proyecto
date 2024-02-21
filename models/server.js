import express from "express";
import path, { dirname } from "path";
import handlebars from "express-handlebars";
import { fileURLToPath } from "url";

import * as http from "http";
import { Server as SocketIoServer } from "socket.io";

import  cartsRoutes  from "../routes/carts.routes.js";
import  messagesRoutes  from "../routes/messages.routes.js";
import  productsRoutes  from "../routes/products.routes.js";
import { dbConnection } from "../db/config.js";
import { socketController } from "../sockets/socketControllers.js";




//import.meta.url proporciona la URL del módulo actual en formato de URL. -- fileURLToPath es una función que convierte una URL en formato de URL a una ruta de sistema de archivos.
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)


export class Server {
    constructor() {
        this.app = express()
        //creo servidor http para socket
        this.httpServer= http.createServer(this.app);
        //info clientes conectados
        this.io = new SocketIoServer(this.httpServer);

        

        this.middlewares();
        this.routes();
        this.conectionDB();
        this.sockets()

    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

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
        this.app.use('/',messagesRoutes);
        this.app.use('/',productsRoutes);

    }
    sockets(){
        this.io.on('connection',(socket)=>{
            socketController(socket,this.io)
        })
    }
    async conectionDB(){
        await dbConnection()

    }
    listen(){
            //para corroborar el funcionamiento ejecutar en tu local "socket.io/socket.io.js"
            this.httpServer.listen('7000',()=>{
            console.log('conectado al localhost 7000 , integradora')
        })

    }

}