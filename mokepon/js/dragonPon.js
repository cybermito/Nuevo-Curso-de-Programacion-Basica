// alert("Hola, mundo JS")

//Declaración variables globales
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const btnMascotaJugador = document.getElementById("btn-mascota");
//Iniciamos las variables de los escuchadores para los distintos botones que vamos a usar.
const botonFuego = document.getElementById("btn-fuego");
const botonAgua = document.getElementById("btn-agua");
const botonTierra = document.getElementById("btn-tierra");
const botonReiniciar = document.getElementById("btn-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

//Seleccionamos el elemento que va a contener el nuevo elemento HTML
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let dragonPones = [];
let opcionDeDragonPones;
let mascotaJugador;
let inputRedDragon;
let inputGreyDragon;
let inputBlueDragon;
let inputPinkDragon;
let inputIntelecDragon;
let inputPyDragon;
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

class DragonPon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vidas = vida;
    this.ataque = [];
  }
}

let redDragon = new DragonPon("RedDragon", "./img/RedDragon.png", 5);
let greyDragon = new DragonPon("GreyDragon", "./img/GreyDragon.png", 5);
let blueDragon = new DragonPon("BlueDragon", "./img/BlueDragon.png", 5);

redDragon.ataque.push(
  { nombre: "Fuego", id: "btn-fuego" },
  { nombre: "Fuego", id: "btn-fuego" },
  { nombre: "Fuego", id: "btn-fuego" },
  { nombre: "Agua", id: "btn-agua" },
  { nombre: "Tierra", id: "btn-tierra" }
);

blueDragon.ataque.push(
  { nombre: "Agua", id: "btn-fuego" },
  { nombre: "Agua", id: "btn-fuego" },
  { nombre: "Agua", id: "btn-fuego" },
  { nombre: "Fuego", id: "btn-agua" },
  { nombre: "Tierra", id: "btn-tierra" }
);

greyDragon.ataque.push(
  { nombre: "Tierra", id: "btn-fuego" },
  { nombre: "Tierra", id: "btn-fuego" },
  { nombre: "Tierra", id: "btn-fuego" },
  { nombre: "Agua", id: "btn-agua" },
  { nombre: "Fuego", id: "btn-tierra" }
);

dragonPones.push(redDragon, greyDragon, blueDragon);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  dragonPones.forEach((dragonPon) => {
    opcionDeDragonPones = `
        <input type="radio" name="mascota" id=${dragonPon.nombre} />
        <label class="tarjeta-dragonpon" for=${dragonPon.nombre}>
            <p>${dragonPon.nombre}</p>
            <img src=${dragonPon.foto}>
        </label>`;

    contenedorTarjetas.innerHTML += opcionDeDragonPones;
  });

  inputRedDragon = document.getElementById("RedDragon");
  inputGreyDragon = document.getElementById("GreyDragon");
  inputBlueDragon = document.getElementById("BlueDragon");
  // inputPinkDragon = document.getElementById('PinkDragon')
  // inputIntelecDragon = document.getElementById('IntelecDragon')
  // inputPyDragon = document.getElementById('PyDragon')

  sectionReiniciar.style.display = "none";
  btnMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

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
    mascotaJugador = "No seleccionaste ninguna mascota";
  }
  //alert("Seleccionaste tu mascota: " + mascota )
  spanMascotaJugador.innerHTML = mascotaJugador;

  //Llamamos a la función extraerAtaques para extraer los ataques de la mascota seleccionada.
  extraerAtaques(mascotaJugador)
  //Llamamos a la función seleccionarMascotaEnemigo para sacar la mascota del enemigo.
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
 let ataques;

  for (let i = 0; i < dragonPones.length; i++){
    if (mascotaJugador === dragonPones[i].nombre) {
      ataques = dragonPones[i].ataque;
    }
  }
  //console.log(ataques);
  mostrarAtaques(ataques);
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, dragonPones.length - 1);

  spanMascotaEnemigo.innerHTML = dragonPones[mascotaAleatoria].nombre;
}

function ataqueFuego() {
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

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "Agua";
  } else {
    ataqueEnemigo = "Tierra";
  }

  combate();
}

function combate() {
  spanVidasJugador.innerHTML = vidasJugador;
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
  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICIDADES, ¡Ganaste! :)");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Oh, lo siento ¡Perdiste! :(");
  }
}

function crearMensaje(resultadoCombate) {
  //Creamos el elemento HTML
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

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
  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

window.addEventListener("load", iniciarJuego);
