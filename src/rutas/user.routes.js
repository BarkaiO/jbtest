import { Router } from "express";
import { pool } from "../dbcon.js"; //importo la base de datos para poder usarla en las rutas


//creo la constante de enrutamiento
const router = Router();
//genero las direcciones a las que van a llamar en mi aplicacion.
//creo la funcion para responder mientras se me pida por get los usuarios
router.get('/user', (req, res)=>{
    res.send('obteniendo usuarios...')
})

// creo mas rutas con parametros:
router.get('/user/:iduser', (req, res)=>{
    const {iduser} = req.params
    res.send('obteniendo usuarios de  id:'+ iduser)
})

//ruta para crear usuarios
router.get('/user/:iduser', (req, res)=>{
    const {iduser} = req.params
    res.send('creando usuario...')
})


export default router;