import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import connectToDB from "./config/configServer.js"
import {__dirname} from "./utils.js"

import routerP from './routers/products.router.js';
import routerC from './routers/carts.router.js';
import routerV from './routers/views.router.js';

//socket.io
import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';
import userRouter from './routers/user.router.js';

const app = express();
const PORT = process.env.PORT || 8080
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//estructura de handlebars
app.engine("handlebars",handlebars.engine())
app.set('view engine', 'handlebars');
app.set("views",__dirname+"/views")


//rutas
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/', routerV);
app.use('/api/sessions',userRouter)


connectToDB()
const httpServer=app.listen(PORT,()=>{
    console.log(`server escuchandoooo en ${PORT}`)
})

//socket server
const socketServer = new Server(httpServer)
socketProducts(socketServer)
socketChat(socketServer)

//  socketServer.on('connection',socket=>{
//     socketChat(socketServer,socket);
//  })