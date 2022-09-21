// alert("Hola, mundo JS")

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota')
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}
function seleccionarMascotaJugador() {
    alert("Seleccionaste tu mascota")
}

window.addEventListener('load', iniciarJuego)