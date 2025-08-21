// alert("Hola, mundo JS");

//Declaración variables globales
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const btnMascotaJugador = document.getElementById('btn-mascota');
//Iniciamos las variables de los escuchadores para los distintos botones que vamos a usar.
const botonReiniciar = document.getElementById('btn-reiniciar');

const sectionSeleccionarMascota = document.getElementById(
  'seleccionar-mascota'
);
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

//const spanVidasJugador = document.getElementById("vidas-jugador");
//const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const spanVictoriasJugador = document.getElementById('victorias-jugador');
const spanVictoriasEnemigo = document.getElementById('victorias-enemigo');

//Seleccionamos el elemento que va a contener el nuevo elemento HTML
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

//Cargamos los botones de movimiento y le añadimos su listener para el movimiento
const arriba = document.getElementById('arriba');
const abajo = document.getElementById('abajo');
const izquierda = document.getElementById('izquierda');
const derecha = document.getElementById('derecha');
//listener del movimiento
arriba.addEventListener('mousedown', moverArriba);
abajo.addEventListener('mousedown', moverAbajo);
izquierda.addEventListener('mousedown', moverIzquierda);
derecha.addEventListener('mousedown', moverDerecha);
arriba.addEventListener('mouseup', pararMovimiento);
abajo.addEventListener('mouseup', pararMovimiento);
izquierda.addEventListener('mouseup', pararMovimiento);
derecha.addEventListener('mouseup', pararMovimiento);

let jugadorId = null;
let dragonPones = [];
let opcionDeDragonPones;
let mascotaJugador;
let mascotaJugadorObjeto;
let inputRedDragon;
let inputGreyDragon;
let inputBlueDragon;
let inputPinkDragon;
let inputIntelecDragon;
let inputPyDragon;
let ataqueJugador = [];
let ataqueEnemigo = [];
let ataquesDragonPonEnemigo;
let ataquesDragonPon;
let botonFuego;
let botonAgua;
let botonTierra;
let botonesAtaques = [];
//let vidasJugador = 3;
//let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext('2d'); //Obtenemos el contexto del canvas para poder dibujar, en este caso 2D
let intervalo; //Para ajustar la frecuencia de refresco/repintar el canva.
let mapaBackground = new Image();
mapaBackground.src = './img/patio_castillo_2.jpg';
//Calcular las dimensiones del mapa según el tamaño del navegador
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
//Limitamos el ancho máximo del mapa
const anchoMaximoDelMapa = 640;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}
//Calculamos la altura según el ancho del navegador
alturaQueBuscamos = (anchoDelMapa * 600) / 800;
//Fijamos el tamaño del mapa
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

//Funciones y Clases
class DragonPon {
  constructor(nombre, foto, vida /* x = 10, y = 10 */) {
    this.nombre = nombre;
    this.foto = foto;
    this.vidas = vida;
    this.ataque = [];
    this.ancho = 120; //Tamaño por defecto del dragonPon
    this.alto = 120;
    //this.x = x; //Posición x dragonPon por defecto
    //this.y = y; //Posición y dragonPon por defecto
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.velocidadX = 0; //Velocidad de movimiento en X
    this.velocidadY = 0; //Velocidad de movimiento en Y
  }

  pintarDragonPon(imagenDragon) {
    lienzo.drawImage(imagenDragon, this.x, this.y, this.ancho, this.alto);
  }

  pintarDragonPonEnemigo() {
    let imagenDragon = new Image();
    imagenDragon.src = this.foto;
    lienzo.drawImage(imagenDragon, this.x, this.y, this.ancho, this.alto);
  }
}

//Creamos los personajes/dragones
let redDragon = new DragonPon('RedDragon', 'img/RedDragon.png', 5);
let greyDragon = new DragonPon('GreyDragon', 'img/GreyDragon.png', 5);
let blueDragon = new DragonPon('BlueDragon', 'img/BlueDragon.png', 5);

//Les asignamos los ataques
redDragon.ataque.push(
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' }
);

blueDragon.ataque.push(
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' }
);

greyDragon.ataque.push(
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' }
);

dragonPones.push(redDragon, greyDragon, blueDragon);

//Creamos los personajes/dragones enemigos
let redDragonEnemigo = new DragonPon('RedDragon', 'img/RedDragon.png', 5);
let greyDragonEnemigo = new DragonPon('GreyDragon', 'img/GreyDragon.png', 5);
let blueDragonEnemigo = new DragonPon('BlueDragon', 'img/BlueDragon.png', 5);

//Les asignamos los ataques
redDragonEnemigo.ataque.push(
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' }
);

blueDragonEnemigo.ataque.push(
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' }
);

greyDragonEnemigo.ataque.push(
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' },
  { nombre: 'Tierra', id: 'btn-tierra', foto: 'img/symbol-tierra.png' },
  { nombre: 'Agua', id: 'btn-agua', foto: 'img/symbol-agua.png' },
  { nombre: 'Fuego', id: 'btn-fuego', foto: 'img/symbol-fuego.png' }
);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';

  dragonPones.forEach((dragonPon) => {
    opcionDeDragonPones = `
        <input type="radio" name="mascota" id=${dragonPon.nombre} />
        <label class="tarjeta-dragonpon" for=${dragonPon.nombre}>
            <p>${dragonPon.nombre}</p>
            <img src=${dragonPon.foto}>
        </label>`;

    contenedorTarjetas.innerHTML += opcionDeDragonPones;
  });

  inputRedDragon = document.getElementById('RedDragon');
  inputGreyDragon = document.getElementById('GreyDragon');
  inputBlueDragon = document.getElementById('BlueDragon');
  // inputPinkDragon = document.getElementById('PinkDragon')
  // inputIntelecDragon = document.getElementById('IntelecDragon')
  // inputPyDragon = document.getElementById('PyDragon')
  sectionReiniciar.style.display = 'none';
  btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);
  unirseAlJuego();
}

function unirseAlJuego() {
  fetch('http://localhost:8080/unirse').then(function (res) {
    //console.log(res);
    if (res.ok) {
      //Si la respuesta es ok
      res
        .text() //Obtenemos el texto de la respuesta, que sería el id.
        .then(function (respuesta) {
          //Como el método .text() es asíncrono usamos .then para ejecutar una
          //acción cuando recibamos la información solicitada, que no sabemos cuando será (ver asicronía en Javascript)
          console.log(respuesta);
          jugadorId = respuesta;
        });
    }
  });
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = 'none';
  //sectionSeleccionarAtaque.style.display = "flex";

  /*   let imagenRedDragon = new Image();
  imagenRedDragon.src = redDragon.foto;
  lienzo.drawImage(
    imagenRedDragon,
    20,
    40,
    80,
    80,
  ); */
  //lienzo.fillRect(5, 15, 20, 40); //Dibujamos un rectángulo en el canvas

  if (inputRedDragon.checked) {
    mascotaJugador = inputRedDragon.id;
  } else if (inputGreyDragon.checked) {
    mascotaJugador = inputGreyDragon.id;
  } else if (inputBlueDragon.checked) {
    mascotaJugador = inputBlueDragon.id;

    // }else if (inputPinkDragon.checked){
    //     mascota = inputPinkDragon.id
    // }else if (inputIntelecDragon.checked){
    //     mascota = inputIntelecDragon.id
    // }else if (inputPyDragon.checked){
    //     mascota = inputPyDragon.id
  } else {
    mascotaJugador = 'No seleccionaste ninguna mascota';
  }
  //alert("Seleccionaste tu mascota: " + mascota )
  spanMascotaJugador.innerHTML = mascotaJugador;
  mascotaJugadorObjeto = obtenerPersonaje(mascotaJugador);
  pintarCanvas(mascotaJugadorObjeto.foto);

  //Llamamos a la función que enviará los datos del dragonPon seleccionado por el jugador.
  seleccionarDragonPon(mascotaJugador);

  //Llamamos a la función extraerAtaques para extraer los ataques de la mascota seleccionada.
  extraerAtaques(mascotaJugador);

  //Llamamos a la función seleccionarMascotaEnemigo para sacar la mascota del enemigo.
  //seleccionarMascotaEnemigo(); La comentamos para la selección manual
  //Cargamos el mapa una vez obtenidos todas las propiedades y métodos de nuestro personaje.
  sectionVerMapa.style.display = 'flex'; //Activamos el canvas para que se vea
  iniciarMapa();
}

//Función que enviará los datos del dragonPon seleccionado
function seleccionarDragonPon(mascotaJugador) {
  fetch(`http://localhost:8080/dragonPon/${jugadorId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dragonPon: mascotaJugador
    })
  });
}

function iniciarMapa() {
  //Indicamos el tamaño del canvas / mapa.
  //mapa.width = 640;
  //mapa.height = 480;

  //intervalo = setInterval(() => presentarMascotaJugador('imagenes/dragonRojo.png'), 50);
  intervalo = setInterval(() => pintarCanvas(mascotaJugadorObjeto.foto), 50); //Ejecutamos la función indicada cada 50ms
  window.addEventListener('keydown', controlTeclado);
  window.addEventListener('keyup', pararMovimiento);
}

function pintarCanvas(imagenPersonaje) {
  mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX; //Sumamos a la posición actual del personaje la velocidad indicada.
  mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height);
  let imagenDragon = new Image();
  imagenDragon.src = imagenPersonaje;
  //pintamos el fondo
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  //Pintamos el jugador
  mascotaJugadorObjeto.pintarDragonPon(imagenDragon);
  //Llámada a la función que enviará la posición/coordenadas del jugador
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
  //Pintamos los enemigos
  redDragonEnemigo.pintarDragonPonEnemigo();
  blueDragonEnemigo.pintarDragonPonEnemigo();
  greyDragonEnemigo.pintarDragonPonEnemigo();

  //Comprobamos las colisiones solamente si el jugador se está moviendo
  if (mascotaJugadorObjeto.x !== 0 || mascotaJugadorObjeto.y !== 0) {
    revisarColision(redDragonEnemigo);
    revisarColision(greyDragonEnemigo);
    revisarColision(blueDragonEnemigo);
  }
}

//Función que enviará los datos de coordenadas y posición del jugador al servidor.
function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/dragonPon/${jugadorId}/posicion`, {
    //Indicamos el método de envío y las cabeceras de configuración del mensaje
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ x, y }) //Como en este caso el json tanto el nombre de la llave
    //como el nombre de la variable asignada es el mismo, javascript nos permite ponerlo con
    //solo un valor. x: x === x, y: y === y
  });
}

// Funciones para controlar el movimiento del personaje
function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
  /* console.log('Mover Arriba');
  redDragon.y -= 5;
  presentarMascotaJugador(redDragon.foto);
  console.log('Posición Y ' + redDragon.y); */
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
  /* console.log('Mover Abajo');
  redDragon.y += 5;
  presentarMascotaJugador(redDragon.foto);
  console.log('Posición Y ' + redDragon.y); */
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
  /* console.log('Mover Izquierda');
  redDragon.x -= 5;
  presentarMascotaJugador(redDragon.foto);
  console.log('Posición X ' + redDragon.y); */
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
  /* console.log('Mover Derecha');
  redDragon.x += 5;
  presentarMascotaJugador(redDragon.foto);
  console.log('Posición X ' + redDragon.y); */
}

function controlTeclado(event) {
  console.log(event.key);
  switch (event.key) {
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    default:
      break;
  }
}

function pararMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}
// Fin de las funciones que controlan el movimiento del personaje.

//Función para obtener el objeto completo del personaje seleccionado
function obtenerPersonaje() {
  //Recorremos la lista completa de personajes que tenemos
  for (let i = 0; i < dragonPones.length; i++) {
    //Comprobamos cuando coincide el personaje seleccionado con el de la lista
    if (mascotaJugador === dragonPones[i].nombre) {
      //Devolvemos el objeto completo del personaje seleccionado
      return dragonPones[i];
    }
  }
}

//Control de colisiones
function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return; //Si se cumple alguna de las condiciones no devolvemos nada ya que
    //no hay colisión y en el caso de que no se cumpla ninguna de las condiciones
    //nos salimos del if y devolvemos un alert por ahora.
  }
  pararMovimiento();
  clearInterval(intervalo); //Detenemos el intervalo para que no siga ejecutándose.
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x - 25;
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
  seleccionarMascotaEnemigo(enemigo);
  //alert('Hay colision con: ' + enemigo.nombre);
}

// Funciones que hacen referencia a los ataques del jugador.
function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < dragonPones.length; i++) {
    if (mascotaJugador === dragonPones[i].nombre) {
      ataques = dragonPones[i].ataque;
    }
  }
  //console.log(ataques);
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesDragonPon = `
     <button id=${ataque.id} class="boton-de-ataque">
        <p>${ataque.nombre}</p>
        <img src=${ataque.foto} alt="Ataque ${ataque.nombre}" />
      </button>
      `;
    contenedorAtaques.innerHTML += ataquesDragonPon;
  });

  botonFuego = document.getElementById('btn-fuego');
  botonAgua = document.getElementById('btn-agua');
  botonTierra = document.getElementById('btn-tierra');
  botonesAtaques = document.querySelectorAll('.boton-de-ataque');

  /* botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra); */
}

function secuenciaAtaque() {
  botonesAtaques.forEach((boton) => {
    boton.addEventListener('click', (evento) => {
      //console.log(evento.currentTarget.id); //Obtenemos el elemento padre o elemento que tiene el listener
      //validamos el botón que hemos hecho click y añadimos este a la secuencia de ataques.
      if (evento.currentTarget.id === 'btn-fuego') {
        ataqueJugador.push('Fuego');
        //console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else if (evento.currentTarget.id === 'btn-agua') {
        ataqueJugador.push('Agua');
        //console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else {
        ataqueJugador.push('Tierra');
        //console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      }
      console.log(ataqueJugador);

      //Validamos si hemos creado ya la secuencia completa de ataques para generar
      //la secuencia del Enemigo.
      if (ataqueJugador.length === 5) {
        ataqueAleatorioEnemigo();
      }
    });
  });
}
// Fin funciones que hacen referencia a los ataques del jugador

// Función para seleccionar el enemigo.

function seleccionarMascotaEnemigo(enemigo) {
  //Generamos la mascota del Enemigo de forma aleatoria con nuestro array de dragonPones
  //let mascotaAleatoria = aleatorio(0, dragonPones.length - 1);

  //Mostramos el nombre en el HTML
  //spanMascotaEnemigo.innerHTML = dragonPones[mascotaAleatoria].nombre;
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  //Guardamos los ataques correspondientes a la mascota elegida. Esta queda guardada en un Array de objetos
  //ataquesDragonPonEnemigo = dragonPones[mascotaAleatoria].ataque;
  ataquesDragonPonEnemigo = enemigo.ataque;
  //console.log(ataquesDragonPonEnemigo);
  //console.log('ataquesDragonPonEnemigo: ' + ataquesDragonPonEnemigo);
  //Recorremos el array de ataques para tomar solamente el nombre y generar la secuencia de ataque del Enemigo
  ataquesDragonPonEnemigo.forEach((ataqueNombre) => {
    //console.log(ataqueNombre.nombre);
    ataqueEnemigo.push(ataqueNombre.nombre); //Ya tenemos la secuencia ordenada
    //console.log(ataqueEnemigo);
  });

  secuenciaAtaque();
}

/* function ataqueFuego() {
  ataqueJugador = "Fuego";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "Agua";
  ataqueAleatorioEnemigo();
}

function ataqueTierra() {
  ataqueJugador = "Tierra";
  ataqueAleatorioEnemigo();
}
 */

function ataqueAleatorioEnemigo() {
  /*   let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "Agua";
  } else {
    ataqueEnemigo = "Tierra";
  } */
  let elementoAleatorio;
  let ataqueEnemigoAux = [];
  //Creamos la secuencia aleatoria
  let sizeAtaqueEnemigo = ataqueEnemigo.length;
  console.log('Tamaño ataque enemigo: ' + ataqueEnemigo);
  for (let i = 0; i < sizeAtaqueEnemigo; i++) {
    elementoAleatorio = aleatorio(0, ataqueEnemigo.length - 1);
    ataqueEnemigoAux.push(ataqueEnemigo[elementoAleatorio]);
    //console.log(ataqueEnemigoAux);
    ataqueEnemigo.splice(elementoAleatorio, 1);
  }
  ataqueEnemigo = Array.from(ataqueEnemigoAux); //Esto genera una copia integra del array, se podría haber usado
  //la forma ...spread, el método .concat y otras formas de hacerlo más completas. Revisar en profundidad como
  //copiar un array para ver las diferencias entre asignar y copiar.
  //console.log(ataqueEnemigo);
  console.log('Secuencia de ataque generada?');
  console.log(ataqueEnemigo);
  iniciarCombate();
  //combate();
}
// Fin funciones en referencia a la selección del enemigo y sus ataques.

//Comienza el combate
function iniciarCombate() {
  if (ataqueJugador.length === 5 && ataqueEnemigo.length === 5) {
    console.log('Iniciando el combate');
    combate();
  } else {
    console.log('No inicia el combate');
  }
}

function combate() {
  spanVictoriasJugador.innerHTML = victoriasJugador;
  spanVictoriasEnemigo.innerHTML = victoriasEnemigo;

  for (let i = 0; i < ataqueJugador.length; i++) {
    //console.log(ataqueJugador[i]);
    //console.log(ataqueEnemigo[i]);
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      crearMensaje('EMPATE', ataqueJugador[i], ataqueEnemigo[i]);
    } else if (
      (ataqueJugador[i] === 'Fuego' && ataqueEnemigo[i] === 'Tierra') ||
      (ataqueJugador[i] === 'Agua' && ataqueEnemigo[i] === 'Fuego') ||
      (ataqueJugador[i] === 'Tierra' && ataqueEnemigo[i] === 'Agua')
    ) {
      crearMensaje('GANASTE', ataqueJugador[i], ataqueEnemigo[i]);
      victoriasJugador++;
      spanVictoriasJugador.innerHTML = victoriasJugador;
    } else {
      crearMensaje('PERDISTE', ataqueJugador[i], ataqueEnemigo[i]);
      victoriasEnemigo++;
      spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
    }
    revisarVictorias();
  }

  /* spanVidasJugador.innerHTML = vidasJugador;
  spanVidasEnemigo.innerHTML = vidasEnemigo;

  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE");
  } else if (
    (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
    (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") ||
    (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")
  ) {
    crearMensaje("GANASTE ");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE ");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }
  revisarVidas(); */
}

function revisarVictorias() {
  /* if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICIDADES, ¡Ganaste! :)");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Oh, lo siento ¡Perdiste! :(");
  } */
  if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('FELICIDADES, ¡Ganaste! :)');
  } else if (victoriasJugador < victoriasEnemigo) {
    crearMensajeFinal('Oh, lo siento ¡Perdiste! :(');
  } else {
    crearMensajeFinal('Hubo Empate');
  }
}

function crearMensaje(resultadoCombate, ataqueJugador, ataqueEnemigo) {
  //Creamos el elemento HTML
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultadoCombate;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  /*     let parrafo = document.createElement('p')
   */ //Creamos el contenido que va a tener el elemento creado, en este caso el párrafo
  /*     parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultadoCombate
   */
  //Insertamos el elemento creado como hijo del elemento padre seleccionado (sectionMensajes)

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  //Creamos el contenido que va a tener el elemento creado, en este caso el párrafo
  sectionMensajes.innerHTML = resultadoFinal;
  //parrafo.innerHTML = resultadoFinal
  /* botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true; */
  sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
  location.reload();
}

window.addEventListener('load', iniciarJuego);
