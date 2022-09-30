// alert("Hola, mundo JS")

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
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
}

window.addEventListener('load', iniciarJuego)