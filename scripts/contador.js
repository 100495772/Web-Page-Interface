// Actualizar el contador
function updateCountdown() {
    // Fecha objetivo y referencias
    const now = new Date();
    const targetDate = new Date('2024-12-25T00:00:00');
    const counterContainer = document.querySelector('.custom-counter');
    const timeDifference = targetDate - now; // Calcula la diferencia (en milisegundos)
    if (timeDifference > 0) { // Si todavía no ha llegado a la fecha
        // Calcular días, horas, minutos y segundos (tener en cuenta que están en milisegndos)
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        // Actualiza el contenido
        document.querySelector('.days').textContent = days;
        document.querySelector('.hours').textContent = hours;
        document.querySelector('.minutes').textContent = minutes;
        document.querySelector('.seconds').textContent = seconds;
        document.querySelector('.message').textContent = '';
    } else {
        // Si la fecha ya pasó, ocultamos el contador
        document.querySelector('.label').textContent = '';
        document.querySelector('.days').textContent = '';
        document.querySelector('.hours').textContent = '';
        document.querySelector('.minutes').textContent = '';
        document.querySelector('.seconds').textContent = '';
        // Selecciona todos los elementos con la clase '.unit'
        const units = document.querySelectorAll('.unit');
        units.forEach(unit => {
            unit.textContent = '';
        });

        // Mostrar el mensaje
        counterContainer.style.display = 'block';
        counterContainer.querySelector('.message').textContent = '🎅 ¡Ya es Navidad! Disfruta de la magia. 🎄';

        // Detener el intervalo
        clearInterval(countdownInterval);
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);
// Ejecuta una actualización inicial
updateCountdown();