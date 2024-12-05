document.addEventListener("DOMContentLoaded", () => {
    const btnRegistro = document.getElementById("btnRegistro");
    const registroForm = document.getElementById("registroForm");

    // Mostrar el modal al hacer clic en el botón "Registrarse"
    btnRegistro.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById("registroModal"));
        modal.show();
    });

    // Guardar los datos en localStorage al confirmar
    registroForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const userType = document.querySelector('input[name="userType"]:checked').value;

        // Guardar en localStorage
        const userData = { username, password, email, userType };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("registroModal"));
        modal.hide();

        // Confirmación
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    });
});