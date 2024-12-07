const searchMap = {
    "home": "index.html",
    "carta": "escribe-tu-carta.html",
    "mapa": "mapa.html",
    "viaje": "reserva-tu-viaje-reseñas.html",
    "videollamada": "reserva-videollamada.html",
    "elfo": "juego1.html",
    "regalos": "juego2.html"
};
function buscarTermino(event) {
    event.preventDefault();
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    // Encontrar la página correspondiente al término
    const page = searchMap[query];
    if (page) {
        // Redirigir a la página
        window.location.href = page;
    } else {
        // Si el término no existe en la lista, mostrar una alerta
        alert("No existe ninguna página correspondiente a ese término.\nIntroduce un término aceptado.");
    }
}