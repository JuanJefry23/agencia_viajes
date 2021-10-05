import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
  //Consultar 3 viajes del modelo Viaje

  const promiseDB = [];

  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    const resultado = await Promise.all(promiseDB);
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1],
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaNosotros = (req, res) => {
  res.render("nos", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  //Consultar B.Datos
  const viajes = await Viaje.findAll();
  res.render("viajes", {
    pagina: "Viajes",
    viajes,
  });
};

const paginaTestimoniales = async (req, res) => {
  try {
    //Consulto los testimoniales desde la base de datos:
    const testimoniales = await Testimonial.findAll();

    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

//Muestra un viaje por su slug(viaje)
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;

  try {
    const viaje = await Viaje.findOne({ where: { slug } });

    res.render("viaje", {
      pagina: "Información Viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};

/*
NOTAS:

-Recordar: .render toma dos(2) parámetros el primero es la vista y el segundo es
 la información que deseo enviarle.
*/
