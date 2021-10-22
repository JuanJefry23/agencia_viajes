import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.production" });

//Solo DEBEMOS tener una instancia de express, porque sino se reiniciara una y otra vez el servidor(*)
const app = express();

//Conectamos a la B.Datos
db.authenticate()
  .then(() => console.log("Conectado correctamente a la B.Datos"))
  .catch((error) => console.log(error));

//Puerto y host para la app
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4000;

//Habilitamos pug
app.set("view engine", "pug");

//Obtener el año actual (Mi propio Middleware)
app.use((req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.nameSite = "Agencia de viajes";

  next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
//Agregamos el router
/*Este "app.use" soporta todos los verbos "put", "post","patch","delete" y lo que estamos haciendo
acá es que desde la página principal "/" agrega "router"(el cuál tiene todas las rutas: /, /nosotros,/contacto) */
app.use("/", router);

app.listen(port, host, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});

/*
-> Básicamente cada de línea de código que esta arriba declarada es una línea del Middleware en Express.

*/
