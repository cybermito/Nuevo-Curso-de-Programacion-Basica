// alert("Hola, mundo JS")

//Declaración variables globales
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar =document.getElementById('reiniciar')
const btnMascotaJugador = document.getElementById('btn-mascota')
//Iniciamos las variables de los escuchadores para los distintos botones que vamos a usar.
const botonFuego = document.getElementById('btn-fuego')
const botonAgua = document.getElementById('btn-agua')
const botonTierra = document.getElementById('btn-tierra')
const botonReiniciar = document.getElementById('btn-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputRedDragon = document.getElementById('redDragon')
const inputGreyDragon = document.getElementById('greyDragon')
const inputPinkDragon = document.getElementById('pinkDragon')
const inputIntelecDragon = document.getElementById('intelecDragon')
const inputPyDragon = document.getElementById('pyDragon')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

//Seleccionamos el elemento que va a contener el nuevo elemento HTML
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')



let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min )
}

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputRedDragon.checked){
        mascota = "RedDragon"
    }else if (inputGreyDragon.checked){
        mascota = "GreyDragono"
    }else if (inputBlueDragon.checked){
        mascota = "BlueDragon"
    }else if (inputPinkDragon.checked){
        mascota = "PinkDragon"
    }else if (inputIntelecDragon.checked){
        mascota = "IntelecDragon"
    }else if (inputPyDragon.checked){
        mascota = "PyDragon"
    }else {
        mascota ="No seleccionaste ninguna mascota"
    }
    //alert("Seleccionaste tu mascota: " + mascota )
    spanMascotaJugador.innerHTML = mascota

    //Llamamos a la función seleccionarMascotaEnemigo para sacar la mascota del enemigo.
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,6)
    if (aleatorio == 1){
        spanMascotaEnemigo.innerHTML = 'RedDragon'
    }else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'GreyDragono'
    }else if (mascotaAleatoria == 3) {
        spanMascotaEnemigo.innerHTML = 'BlueDrago'
    }else if (mascotaAleatoria == 4) {
        spanMascotaEnemigo.innerHTML = 'PinkDragon'
    }else if (mascotaAleatoria == 5) {
        spanMascotaEnemigo.innerHTML = 'IntelecDragon'
    }else {
        spanMascotaEnemigo.innerHTML = 'PyDragon'
    }
}

function ataqueFuego() {
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1){
        ataqueEnemigo = 'Fuego'
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'Agua'
    } else {
        ataqueEnemigo = 'Tierra'
    }

    combate()
}

function combate(){

    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo

    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE")
    } else if ((ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') || (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') || (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua')){
        
        crearMensaje("GANASTE ")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        
        crearMensaje("PERDISTE ")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {

    if (vidasEnemigo == 0) {

        crearMensajeFinal("FELICIDADES, ¡Ganaste! :)")
    } else if (vidasJugador == 0) {
        
        crearMensajeFinal("Oh, lo siento ¡Perdiste! :(")
    }
}

function crearMensaje(resultadoCombate){
    //Creamos el elemento HTML
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultadoCombate
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

/*     let parrafo = document.createElement('p')
 */    //Creamos el contenido que va a tener el elemento creado, en este caso el párrafo
/*     parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultadoCombate
*/
    //Insertamos el elemento creado como hijo del elemento padre seleccionado (sectionMensajes)
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    //Creamos el contenido que va a tener el elemento creado, en este caso el párrafo
    sectionMensajes.innerHTML = resultadoFinal
    //parrafo.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
    
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)