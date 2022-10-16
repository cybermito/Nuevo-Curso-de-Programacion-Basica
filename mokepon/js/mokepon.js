// alert("Hola, mundo JS")

//Declaración variables globales
let ataqueJugador
let ataqueEnemigo

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min )
}

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    //Iniciamos las variables de selección tipo de ataque y su listener para el jugador
    let botonFuego = document.getElementById('btn-fuego')
    let botonAgua = document.getElementById('btn-agua')
    let botonTierra = document.getElementById('btn-tierra')

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
}

function seleccionarMascotaJugador() {
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
}

window.addEventListener('load', iniciarJuego)