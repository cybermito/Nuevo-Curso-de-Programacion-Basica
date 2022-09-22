// alert("Hola, mundo JS")

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}
function seleccionarMascotaJugador() {
    //Resolviendo el reto de selección de mascota parte 1
    //Esta sería una primera forma, ahora veremos que existen otras
    //las cuales es usando las buenas prácticas y organización del código.
    let mascota =""
    if (document.getElementById('hipodoge').checked){
        mascota = "Hipodoge"
    }else if (document.getElementById('capipepo').checked){
        mascota = "Capipepo"
    }else if (document.getElementById('ratigueya').checked){
        mascota = "Ratigueya"
    }else if (document.getElementById('langostelvis').checked){
        mascota = "Langostelvi"
    }else if (document.getElementById('tucapalma').checked){
        mascota = "Tucapalma"
    }else if (document.getElementById('pydos').checked){
        mascota = "Pydos"
    }
    alert("Seleccionaste tu mascota: " + mascota )
}

window.addEventListener('load', iniciarJuego)