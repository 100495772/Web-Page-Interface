document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("loggedInUser");

    if (isLoggedIn && username) {
        updateNavbar();
    }
});

// Actualizar el navbar para usuarios logueados
function updateNavbar() {
// Actualizar el navbar
    const userData = JSON.parse(localStorage.getItem("userData"));

    const navbar = document.querySelector(".navbar-collapse");
    navbar.innerHTML = `
                <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link" href="mapa.html">Mapa</a></li>
                <li class="nav-item"><a class="nav-link" href="escribe-tu-carta.html">Envía tu carta</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="juegaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ¡Juega!
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="juegaDropdown">
                        <li><a class="dropdown-item" href="#">Juego 1</a></li>
                        <li><a class="dropdown-item" href="#">Juego 2</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="verPapáNoelDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ver a Papá Noel
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="juegaDropdown">
                        <li><a class="dropdown-item" href="reserva-videollamada.html">Videollamada con Papá Noel</a></li>
                        <li><a class="dropdown-item" href="reserva-tu-viaje-reseñas.html">Viaje al pueblo de Papá Noel</a></li>
                    </ul>
                </li>
                </ul>
                <form class="d-flex me-3">
                    <input class="form-control" type="search" placeholder="Buscar" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Buscar</button>
                </form>
                <div class="d-flex align-items-center">
                    <img src="images/login.png" alt="Perfil" class="profile-icon me-2">
                    <span>¡Hola, ${userData.username}!</span>
                </div>
                <button type="submit" id="logoutBtn" class="btn">Cerrar Sesión</button>


            `;
    // funcionalidad de cerrar sesión (tengo que añadir el botón al html)
    document.getElementById("logoutBtn").addEventListener("click", logout);
}


// Cerrar sesión
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.reload();
}
