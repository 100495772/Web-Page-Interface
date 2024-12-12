document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("loggedInUser");
    const userOrders = JSON.parse(localStorage.getItem("userOrders")) || {}; // usersOrders son los viajes
    const userReservations = JSON.parse(localStorage.getItem("userReservations")) || {}; // userReservations son las videollamadas
    const orders = userOrders[username] || [];
    const videocalls = userReservations[username] || [];

    const userInfo = document.getElementById("userInfo");
    const orderHistory = document.getElementById("orderHistory"); // historial de viajes
    const videocallHistory = document.getElementById("videocallHistory"); // historial de videollamadas

    if (!username) {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "index.html";
        return;
    }

    userInfo.innerHTML = `
        <strong>Usuario:</strong> ${username}<br>
        <strong>Email:</strong> ${JSON.parse(localStorage.getItem("userData")).email || "No disponible"}<br>
        <strong>Tipo de cuenta:</strong> ${JSON.parse(localStorage.getItem("userData")).userType || "No disponible"}`
    ;

    if (orders.length === 0) {
        orderHistory.innerHTML = `<p>No tienes reservas de viaje aún.</p>`;
    } else {
        orders.forEach((order) => {
            const div = document.createElement("div");
            div.classList.add("order-item", "bg-yellow", "col-md-5", "p-4", "rounded", "shadow-sm", "mb-4");

            // Encabezado del pedido
            div.innerHTML = `
            <h4 class="mb-3"><strong>Pedido realizado el:</strong> ${order.orderDate}</h4>
            <p><strong>Total del pedido:</strong> ${order.total.toFixed(2)} €</p>
            <hr>
            <h5 class="mt-3">Artículos del pedido:</h5>
        `;

            // Iterar sobre los artículos del pedido
            order.items.forEach((item) => {
                div.innerHTML += `
                <p><strong>Paquete:</strong> ${item.package}</p>
                <p><strong>Fecha:</strong> ${item.date}</p>
                <p><strong>Cantidad:</strong> ${item.quantity}</p>
                <p><strong>Subtotal:</strong> ${item.subtotal.toFixed(2)} €</p>
                <hr>
            `;
            });

            // Detalles personales, pago y dirección
            div.innerHTML += `
            <h5 class="mt-3">Detalles personales</h5>
            <p><strong>Nombre:</strong> ${order.personalDetails.name} ${order.personalDetails.lastName}</p>
            <p><strong>Email:</strong> ${order.personalDetails.email}</p>
            <p><strong>Teléfono:</strong> ${order.personalDetails.phone}</p>
            <hr>
            <h5 class="mt-3">Detalles de pago</h5>
            <p><strong>Tarjeta:</strong> ${order.paymentDetails.cardNumber}</p>
            <hr>
            <h5 class="mt-3">Dirección</h5>
            <p><strong>Calle:</strong> ${order.addressDetails.street}</p>
            <p><strong>Ciudad:</strong> ${order.addressDetails.city}</p>
            <p><strong>Estado:</strong> ${order.addressDetails.state}</p>
            <p><strong>País:</strong> ${order.addressDetails.country}</p>
            <p><strong>Código postal:</strong> ${order.addressDetails.postalCode}</p>
        `;
            orderHistory.appendChild(div);
        });
    }

    // Verificar y mostrar reservas de videollamadas
    if (videocalls.length === 0) {
        videocallHistory.innerHTML = `<p>No tienes reservas de videollamadas aún.</p>`;
    } else {
        videocalls.forEach((reservation) => {
            const div = document.createElement("div");
            div.classList.add("order-item", "bg-rosado","col-md-5", "p-4", "rounded", "shadow-sm", "mb-4");
            div.innerHTML = `
                <h4 class="mb-3">Videollamada con Papá Noel</h4>
                <p><strong>Fecha:</strong> ${reservation.date}</p>
                <p><strong>Hora:</strong> ${reservation.time}</p>
                <p><strong>Niño/a:</strong> ${reservation.childName} (${reservation.childAge} años)</p>
                <p><strong>Adulto/a:</strong> ${reservation.adultName}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Idioma:</strong> ${reservation.language}</p>
                <a href="videollamada-directa.html" class="btn" >Link a la videollamada🎥</a>
            `;
            videocallHistory.appendChild(div);
        });
    }
});
