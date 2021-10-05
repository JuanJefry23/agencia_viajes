//Este archivo contendrá todas las rutas
import express from "express";
import {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
} from "../controllers/paginasController.js";

import { guardarTestimonial } from "../controllers/testimonialController.js";

//Aca extiendo la instancia de express, para no tenerlo repetido y que me pase el problema descripto en (*)
const router = express.Router();

//Creamos todas las rutas, asignando las rutas al objeto de "router"

router.get("/", paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/viajes", paginaViajes);

router.get("/viajes/:slug", paginaDetalleViaje);

//Cuando quiero ver/visitar la página "get"
router.get("/testimoniales", paginaTestimoniales);
//Cuando envio datos a la página
router.post("/testimoniales", guardarTestimonial);

export default router;

/*
NOTA:

-> Es mejor todas las vistas (rutas) en su propio archivo como en este caso, para no tenerlo
   en el archivo principal.
*/
