
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configura la aplicación Express
const app = express();
app.use(bodyParser.json());

// Conecta a la base de datos MongoDB
mongoose.connect('mongodb://localhost/tu_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define un esquema para las películas
const peliculaSchema = new mongoose.Schema({
  titulo: String,
  director: String,
  genero: String,
  anio: Number,
  reparto: [String],
  sinopsis: String,
  calificacion: Number
});

// Crea un modelo basado en el esquema
const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Ruta para crear una película
app.post('/peliculas', (req, res) => {
  const nuevaPelicula = new Pelicula(req.body);
  nuevaPelicula.save((err) => {
    if (err) {
      res.status(500).send('Error al guardar la película');
    } else {
      res.status(201).send('Película guardada con éxito');
    }
  });
});

// Ruta para obtener todas las películas
app.get('/peliculas', (req, res) => {
  Pelicula.find((err, peliculas) => {
    if (err) {
      res.status(500).send('Error al obtener películas');
    } else {
      res.json(peliculas);
    }
  });
});

// Ruta para obtener una película por ID
app.get('/peliculas/:id', (req, res) => {
  Pelicula.findById(req.params.id, (err, pelicula) => {
    if (err) {
      res.status(500).send('Error al obtener la película');
    } else {
      res.json(pelicula);
    }
  });
});

// Ruta para actualizar una película por ID
app.put('/peliculas/:id', (req, res) => {
  Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, pelicula) => {
    if (err) {
      res.status(500).send('Error al actualizar la película');
    } else {
      res.json(pelicula);
    }
  });
});

// Ruta para eliminar una película por ID
app.delete('/peliculas/:id', (req, res) => {
  Pelicula.findByIdAndRemove(req.params.id, (err, pelicula) => {
    if (err) {
      res.status(500).send('Error al eliminar la película');
    } else {
      res.status(204).send('Película eliminada con éxito');
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('El servidor está en funcionamiento en el puerto 3000');
});