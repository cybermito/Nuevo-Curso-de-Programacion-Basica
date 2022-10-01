// alert("Hola, mundo JS")

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min )
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
    let ataqueAleatorio = aleatorio(1,6)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (aleatorio == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    }else if (ataqueAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipego'
    }else if (ataqueAleatorio == 3) {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }else if (ataqueAleatorio == 4) {
        spanMascotaEnemigo.innerHTML = 'Langostelvi'
    }else if (ataqueAleatorio == 5) {
        spanMascotaEnemigo.innerHTML = 'Tucapalma'
    }else {
        spanMascotaEnemigo.innerHTML = 'Pydos'
    }
}

window.addEventListener('load', iniciarJuego)