function updateNavbar() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loggedInUser = localStorage.getItem("loggedInUser");

    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    const profileSection = document.getElementById("profileSection");
    const usernameDisplay = document.getElementById("usernameDisplay");

    if (isLoggedIn && loggedInUser) {
        // Mostrar el ícono de perfil y actualizar el nombre del usuario
        profileSection.style.display = "flex";
        usernameDisplay.textContent = `¡Hola, ${loggedInUser}!`;

        // Ocultar los botones de inicio de sesión y registro
        if (btnLogin) btnLogin.style.display = "none";
        if (btnRegistro) btnRegistro.style.display = "none";
    } else {
        // Mostrar los botones de inicio de sesión y registro
        if (btnLogin) btnLogin.style.display = "inline-block";
        if (btnRegistro) btnRegistro.style.display = "inline-block";

        // Ocultar el perfil
        if (profileSection) profileSection.style.display = "none";
    }

    // Manejar el evento de cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loggedInUser");
            //window.location.href = "index.html"; // Redirigir al inicio al cerrar sesión
            window.location.reload();
        });
    }
}

document.addEventListener("DOMContentLoaded", updateNavbar);
