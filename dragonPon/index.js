//Importamos las librerías necesarias, en este caso express.js y cors para seguridad
//en el envío y recepción de datos entre backen y frontend
const express = require('express');
const cors = require('cors');

//Creamos una instancia de nuestra aplicación con express.js
const app = express();
//Deshabilitamos todos los posibles errores de Control de Acceso CORS
app.use(cors());
//Habilitamos el uso de datos JSON en las peticiones post
app.use(express.json());

//Agregamos variables
const jugadores = []; //Guardaremos la lista de jugadores conectados al juego

//Clases del juego
//Clase Jugador, para construir cada jugador nuevo que se conecte
class Jugador {
  constructor(id) {
    this.id = id;
  }
  //Método para asignar el DragonPon al jugador
  asignarDragonPon(dragonPon) {
    this.dragonPon = dragonPon;
  }
  //Método para actualizar la posición en x e y del jugador.
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }
}
//Clase DragonPon, para construir y asignar a cada jugador el DragonPon seleccionado
class DragonPon {
  constructor(nombre) {
    this.nombre = nombre;
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

//Endepoint/servicio de petición donde recibiremos los datos del dragonPon seleccionado
//frontend
app.post('/dragonPon/:jugadorId', (req, res) => {
  //:jugadorId es la forma de indicar los parámetros
  //que recibiremos en la URL
  const jugadorId = req.params.jugadorId || ''; //Asignamos el valor recibido como parámetro
  //Extraemos el nombre del Dragonpon seleccionado por el jugador
  const nombreDragonPon = req.body.dragonPon || '';
  //Creamos el nuevo dragonPon
  const dragonPon = new DragonPon(nombreDragonPon);

  //Validamos la existencia del id del jugador para asignarle el dragonPon
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  //Si existe el id en la lista de jugadores, asignamos el dragonPon
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarDragonPon(dragonPon);
  }

  console.log(jugadores); //Visualizamos en consola la lista de jugadore unidos a la partida
  console.log(jugadorId); //Visualizamos el Id del jugador actual
  res.end(); // Finalizamos el proceso de petición para que no quede bloqueado el servidor.
});

//Endpoint/servicio que nos marcará las coordenadas/posición del jugador y resto de jugadores
app.post('/dragonPon/:jugadorId/posicion', (req, res) => {
  //Tomamos el id del jugador a partir de los parámetros pasados en la URI
  const jugadorId = req.params.jugadorId || '';
  //Extraemos los valores x e y del body (cuerpo del mensaje)
  const x = req.body.x || 0; //En caso de no recibir nada se le asigna 0
  const y = req.body.y || 0;
  //Validamos la existencia del id del jugador para asignar los valores x e y
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }
  //finalizamos con una respuesta vacia, ya que siempre hay que devolver una respuesta
  res.end();
});

//Indicamos a nuestra app que se mantenga escuchando en el puerto indicado.
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
  console.log('Ve al navegador y escribe localhost:8080');
});
