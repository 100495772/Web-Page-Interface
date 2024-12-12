const divJuego = document.getElementById('juego-regalos');
const player = document.getElementById('player');
const puntosDisplay = document.getElementById('puntos');
const contadorDisplay = document.getElementById('contador');

let puntos = 0;
let contador = 60;
let gameInterval;
let regaloInterval;

function empezarJuego() {
    gameInterval = setInterval(actualizarContador, 1000);
    regaloInterval = setInterval(crearRegalo, 1000);
    puntos = 0;
    contador = 60;
    document.getElementById('boton-empezar').style.visibility = 'hidden'
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        moverPlayer(event);
    }
});

function actualizarContador() {
    contador--;
    contadorDisplay.textContent = `Tiempo: ${contador}`;
    if (contador <= 2) {
        clearInterval(regaloInterval);
    }
    if (contador <= 0) {
        terminarJuego();
    }
}

function crearRegalo() {
    const regalo = document.createElement('div');
    regalo.classList.add('regalo');
    regalo.style.left = Math.random() * (divJuego.clientWidth - 50) + 'px';
    regalo.style.top = '0px';

    // Rotación aleatoria del sprite de los regalos
    const randomRotation = Math.random() * 360;
    regalo.style.transform = `rotate(${randomRotation}deg)`;

    divJuego.appendChild(regalo);

    let fallInterval = setInterval(() => {
        regalo.style.top = (regalo.offsetTop + 5) + 'px';
        if (regalo.offsetTop > divJuego.clientHeight) {
            clearInterval(fallInterval);
            divJuego.removeChild(regalo);
        }
        comprobarColision(regalo, fallInterval);
    }, 25);
}

function comprobarColision(regalo, fallInterval) {
    const regaloRect = regalo.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
        regaloRect.bottom > playerRect.top &&
        regaloRect.top < playerRect.bottom &&
        regaloRect.right > playerRect.left &&
        regaloRect.left < playerRect.right
    ) {
        puntos++;
        puntosDisplay.textContent = `Puntos: ${puntos}`;
        clearInterval(fallInterval);
        divJuego.removeChild(regalo);
    }
}

let playerSpeed = 15;   //Velocidad horizontal del jugador

function moverPlayer(event) {
    const playerRect = player.getBoundingClientRect();
    if (event.key === 'ArrowLeft' && playerRect.left > divJuego.offsetLeft) {
        player.style.left = (player.offsetLeft - playerSpeed) + 'px';
    }
    if (event.key === 'ArrowRight' && playerRect.right < divJuego.offsetLeft + divJuego.clientWidth) {
        player.style.left = (player.offsetLeft + playerSpeed) + 'px';
    }
}

function terminarJuego() {
    clearInterval(gameInterval);
    alert(`¡Fin del juego!\nPuntuación: ${puntos}`);
    document.getElementById('boton-empezar').style.visibility = 'visible'

}