document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const loginForm = document.getElementById("loginForm");

    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        const modalElement = document.getElementById("loginModal");
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const userData = JSON.parse(localStorage.getItem("userData"));

        if (userData && userData.username === username && userData.password === password) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedInUser", userData.username);

            // Recargar la página actual
            window.location.reload();
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});
