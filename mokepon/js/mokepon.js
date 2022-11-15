// alert("Hola, mundo JS")

//Declaración variables globales
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min )
}

function iniciarJuego(){

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    let sectionReiniciar =document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //Iniciamos las variables de los escuchadores para los distintos botones que vamos a usar. 
    let botonFuego = document.getElementById('btn-fuego')
    let botonAgua = document.getElementById('btn-agua')
    let botonTierra = document.getElementById('btn-tierra')
    let botonReiniciar = document.getElementById('btn-reiniciar')

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'

    //Resolviendo el reto de selección de mascota parte 2
    //Usamos variables para obtener el objeto completo con todos sus atributos y métodos que 
    //podrémos usar posteriormente en las condicionales. 
   
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipego = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangostelvis = document.getElementById('langostelvis')
    let inputTucapalma = document.getElementById('tucapalma')
    let inputPydos = document.getElementById('pydos')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if (inputHipodoge.checked){
        mascota = "Hipodoge"
    }else if (inputCapipego.checked){
        mascota = "Capipepo"
    }else if (inputRatigueya.checked){
        mascota = "Ratigueya"
    }else if (inputLangostelvis.checked){
        mascota = "Langostelvis"
    }else if (inputTucapalma.checked){
        mascota = "Tucapalma"
    }else if (inputPydos.checked){
        mascota = "Pydos"
    }else {
        mascota ="No seleccionaste ninguna mascota"
    }
    //alert("Seleccionaste tu mascota: " + mascota )
    spanMascotaJugador.innerHTML = mascota

    //Llamamos a la funcion seleccionarMascotaEnemigo para sacar la mascota del enemigo.
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,6)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (aleatorio == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    }else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipego'
    }else if (mascotaAleatoria == 3) {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }else if (mascotaAleatoria == 4) {
        spanMascotaEnemigo.innerHTML = 'Langostelvi'
    }else if (mascotaAleatoria == 5) {
        spanMascotaEnemigo.innerHTML = 'Tucapalma'
    }else {
        spanMascotaEnemigo.innerHTML = 'Pydos'
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

    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

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
    let parrafo = document.createElement('p')
    //Seleccionamos el elemento que va a contener el nuevo elemento HTML
    let sectionMensajes = document.getElementById('mensajes')

    //Creamos el contenido que va a tener el elemento creado, en este caso el párrafo
    parrafo.innerHTML = 'Tu mascota atacó ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultadoCombate
    //Insertamos el elemento creado como hijo del elemento padre seleccionado (sectionMensajes)
    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal){
    //Creamos el elemento HTML
    let parrafo = document.createElement('p')
    //Seleccionamos el elemento que va a contener el nuevo elemento HTML
    let sectionMensajes = document.getElementById('mensajes')

    //Creamos el contenido que va a tener el elemento creado, en este caso el párrafo
    parrafo.innerHTML = resultadoFinal
    //Insertamos el elemento creado como hijo del elemento padre seleccionado (sectionMensajes)
    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('btn-fuego')
    let botonAgua = document.getElementById('btn-agua')
    let botonTierra = document.getElementById('btn-tierra')

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    let sectionReiniciar =document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'
    
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)