//Express para conexiones en la red
//morgan para las peticiones en http
//pg para Postgressql
console.log( "hallo v.v");

import express from 'express'
//llamo a variable de port que esta en config
import { PORT } from './configports.js';  //se exporto solito al poner port pero sin el js >v
//llamo a la ruta de usuarios con un nuevo nombre
import userRoutes from "./rutas/user.routes.js"

import { insertBalance } from './dbcon.js';

//creo el servidor 
const app = express();

//llamo a la exportacion de mi ruta de usuarios para comprobar su funcionamiento
app.use(userRoutes);

//insertBalance(5, 'Juon', 1000); // Ejemplo de uso de la función insertBalance


//*agrego el codigo para leer la balanza por modbusRTU

//*termina el codigo para leer la balanza por modbusRTU

//establesco el server en
app.listen(PORT);
console.log("Server en Puerto", PORT);

