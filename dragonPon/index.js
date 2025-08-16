//Importamos las librerías necesarias, en este caso express.js
const express = require('express');

//Creamos una instancia de nuestra aplicación con express.js
const app = express();

//Configuramos las peticiones que vamos a recibir y como vamos a responder
app.get('/', (req, res) => {
  res.send('<h1>Hola Mundo</h1>');
});

//Pruebas a parte personales
app.get('/encenderLed', (req, res) => {
  res.send('<h2>Led encendido</h2>');
});

//Indicamos a nuestra app que se mantenga escuchando en el puerto indicado.
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
  console.log('Ve al navegador y escribe localhost:8080');
});
