document.addEventListener("DOMContentLoaded", () => {
    // Carga el carrito desde el almacenamiento local o inicializa un carrito vacío.
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const orderSummary = document.getElementById("orderSummary");
    const totalAmount = document.getElementById("totalAmount");
    const completeOrderBtn = document.getElementById("completeOrder");
    const cancelOrderBtn = document.getElementById("cancelOrder");

    // Actualiza el resumen del pedido en la página.
    function updateOrderSummary() {
        let total = 0;
        orderSummary.innerHTML = ""; // Limpia el resumen antes de actualizar.

        // Recorre los elementos del carrito y los muestra en el resumen.
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("order-item", "mb-4", "p-3", "bg-yellow", "rounded");
            div.innerHTML = `
                <p><strong>${item.package}</strong></p>
                <p>Fecha: ${item.date}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p>Precio unitario: ${item.price.toFixed(2)} €</p>
                <p>Subtotal: ${item.subtotal.toFixed(2)} €</p>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Eliminar</button>
            `;
            total += item.subtotal; // Suma el subtotal de cada artículo al total.
            orderSummary.appendChild(div); // Añade el artículo al resumen
        });

        // Muestra el total del pedido en pantalla.
        totalAmount.textContent = `${total.toFixed(2)} €`;

        // Asigna listeners a los botones de eliminar artículos.
        addRemoveListeners();
    }

    // Añade eventos para eliminar artículos del carrito.
    function addRemoveListeners() {
        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart.splice(index, 1); // Elimina el artículo del carrito
                localStorage.setItem("shoppingCart", JSON.stringify(cart)); // Actualiza el carrito en el almacenamiento local
                updateOrderSummary(); // Refresca el resumen del pedido
            });
        });
    }

    // Valida que todos los campos obligatorios del formulario estén completos.
    function validateForm() {
        const requiredFields = document.querySelectorAll(".bg-formulario input");
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                alert(`El campo "${field.placeholder}" es obligatorio.`);
                return false; // Si falta algún campo, detiene el proceso
            }
        }
        return true;
    }

    // Maneja el proceso de completar el pedido.
    completeOrderBtn.addEventListener("click", () => {
        // Verifica si el usuario ha iniciado sesión.
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const username = localStorage.getItem("loggedInUser");

        if (!isLoggedIn || !username) {
            alert("Debes iniciar sesión para completar tu pedido.");
            window.location.reload(); // Redirige al usuario a iniciar sesión.
            return;
        }

        if (cart.length === 0) {
            alert("Tu carrito está vacío. Agrega artículos antes de completar tu pedido.");
            return;
        }
        if (!validateForm()) {
            return; // Si el formulario no es válido, detiene el proceso
        }

        // Obtiene los datos personales del formulario.
        const personalDetails = {
            name: document.querySelector(".bg-formulario input[placeholder='Nombre']").value,
            lastName: document.querySelector(".bg-formulario input[placeholder='Apellidos']").value,
            email: document.querySelector(".bg-formulario input[placeholder='Email']").value,
            phone: document.querySelector(".bg-formulario input[placeholder='Número de teléfono']").value,
        };

        // Obtiene los datos de pago del formulario.
        const paymentDetails = {
            cardName: document.querySelector(".bg-formulario input[placeholder='Nombre de la tarjeta']").value,
            cardNumber: document.querySelector(".bg-formulario input[placeholder='Número de la tarjeta']").value,
            cvv: document.querySelector(".bg-formulario input[placeholder='CVV']").value,
            expiryDate: document.querySelector(".bg-formulario input[placeholder='Fecha de caducidad (MM/YY)']").value,
        };

        // Obtiene la dirección del formulario.
        const addressDetails = {
            street: document.querySelector(".bg-formulario input[placeholder='Calle y número']").value,
            city: document.querySelector(".bg-formulario input[placeholder='Ciudad']").value,
            state: document.querySelector(".bg-formulario input[placeholder='Estado']").value,
            country: document.querySelector(".bg-formulario input[placeholder='País']").value,
            postalCode: document.querySelector(".bg-formulario input[placeholder='Código postal']").value,
        };

        // Crea un objeto de pedido con todos los datos necesarios.
        const completedOrder = {
            items: cart.map((item) => ({
                package: item.package,
                date: item.date,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.subtotal,
            })),
            total: cart.reduce((sum, item) => sum + item.subtotal, 0),
            personalDetails,
            paymentDetails,
            addressDetails,
            orderDate: new Date().toLocaleDateString(),
        };

        // Guarda el pedido en el historial del usuario
        const userOrders = JSON.parse(localStorage.getItem("userOrders")) || {};
        const userCart = userOrders[username] || [];

        userOrders[username] = [...userCart, completedOrder];
        localStorage.setItem("userOrders", JSON.stringify(userOrders));

        // Muestra un mensaje de confirmación y vacía el carrito
        alert("¡Pedido completado! Gracias por tu compra.");
        localStorage.removeItem("shoppingCart");
        window.location.href = "miperfil.html";
    });

    // Redirige al inicio si se cancela el pedidov
    cancelOrderBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Inicializa el resumen del pedido al cargar la página
    updateOrderSummary();
});