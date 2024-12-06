document.addEventListener("DOMContentLoaded", () => {
    const reservationForm = document.querySelector(".datos-form");
    const datePicker = document.getElementById("date-picker");
    const timePicker = document.querySelector(".time-container select");

    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        const date = datePicker.value;
        const time = timePicker.value;
        const childName = document.getElementById("child-name").value.trim();
        const childAge = document.getElementById("child-age").value.trim();
        const adultName = document.getElementById("adult-name").value.trim();
        const email = document.getElementById("email-videocall").value.trim();

        if (!date || !time || !childName || !childAge || !adultName || !email) {
            alert("Por favor, completa todos los campos antes de reservar la videollamada.");
            return;
        }

        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const username = localStorage.getItem("loggedInUser");

        if (!isLoggedIn || !username) {
            alert("Debes iniciar sesión para reservar una videollamada.");
            return;
        }

        // Crear un objeto para la reserva
        const reservation = {
            date,
            time,
            childName,
            childAge,
            adultName,
            email,
        };

        // Guardar la reserva en localStorage
        const userReservations = JSON.parse(localStorage.getItem("userReservations")) || {};
        const userVideocalls = userReservations[username] || [];
        userVideocalls.push(reservation);
        userReservations[username] = userVideocalls;
        localStorage.setItem("userReservations", JSON.stringify(userReservations));

        alert("¡Reserva realizada con éxito!");
        reservationForm.reset(); // Limpiar el formulario
        window.location.href = "miperfil.html";
    });
});
