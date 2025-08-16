//Importamos las librerías necesarias, en este caso express.js
const express = require('express');

//Creamos una instancia de nuestra aplicación con express.js
const app = express();

//Agregamos variables
const jugadores = []; //Guardaremos la lista de jugadores conectados al juego

//Clases del juego
//Clase Jugador, para construir cada jugador nuevo que se conecte
class Jugador {
  constructor(id) {
    this.id = id;
  }
}

//Configuramos las peticiones que vamos a recibir y como vamos a responder
//Endpoint/petición unirse, enlace para unirse al juego.
app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`; //Creamos el id aleatorio
  const jugador = new Jugador(id); //Creamos el objeto jugador con su id.
  jugadores.push(jugador); //Agregamos el jugador a la lista
  //Establecemos las cabecera de comunicación donde indicamos los permisos
  //de acceso a este, desde que origenes podemos hacer peticiones al servidor
  //En este caso permitimos a todos los origenes por facilidad y demostración
  //pero no es lo más seguro, así que debemos tener cuidaddo con estos comandos.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(id);
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
