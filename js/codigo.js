//Declaración de funciones
//Con fuction puedo generar una función que es un bloque de código que me sirve para reutilizar en cualquier parte del programa. 
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Creamos la función elección de jugada para refactorizar el programa usando funciones.
function eleccion(jugada){
    let resultado = ""

    if (jugada == 1){
        resultado = "Piedra 🥌"
    } else if (jugada == 2){
        resultado = "Papel 📋"
    } else if (jugada == 3) {
        resultado = "Tijera ✂"
    } else {
        resultado = "MAL ELEGIDO"
    }
    
    return resultado
}
// 1 es piedra, 2 es papel, 3 es tijera
// Declaración de variables
let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0
    
while (triunfos < 3 && perdidas < 3){

    pc = aleatorio(1, 3)
    jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
 
    alert("Pc eligió " + eleccion(pc))
    alert("Tu elegiste " + eleccion(jugador))

    // Código acortado sin perder la legibilidad, utilizando la logica OR "||"
    if (jugador == pc) {
        alert("EMPATE")
    } else if ((jugador == 1 && pc == 3) || (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)){
        triunfos = triunfos + 1
        alert("GANASTE " + triunfos)
    } else {
        perdidas = perdidas + 1
        alert("PERDISTE " + perdidas)
    }
}

alert ("Ganaste " + triunfos + " veces. Perdiste " + perdidas + " veces.")
        