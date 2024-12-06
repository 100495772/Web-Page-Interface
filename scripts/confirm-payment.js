document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const orderSummary = document.getElementById("orderSummary");
    const totalAmount = document.getElementById("totalAmount");
    const completeOrderBtn = document.getElementById("completeOrder");
    const cancelOrderBtn = document.getElementById("cancelOrder");

    function updateOrderSummary() {
        let total = 0;
        orderSummary.innerHTML = "";

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
            total += item.subtotal;
            orderSummary.appendChild(div);
        });

        totalAmount.textContent = `${total.toFixed(2)} €`;
        addRemoveListeners();
    }

    function addRemoveListeners() {
        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("shoppingCart", JSON.stringify(cart));
                updateOrderSummary();
            });
        });
    }

    function validateForm() {
        const requiredFields = document.querySelectorAll(".bg-formulario input");
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                alert(`El campo "${field.placeholder}" es obligatorio.`);
                return false;
            }
        }
        return true;
    }

    completeOrderBtn.addEventListener("click", () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const username = localStorage.getItem("loggedInUser");

        if (!isLoggedIn || !username) {
            alert("Debes iniciar sesión para completar tu pedido.");
            window.location.reload();
            return;
        }

        if (cart.length === 0) {
            alert("Tu carrito está vacío. Agrega artículos antes de completar tu pedido.");
            return;
        }
        if (!validateForm()) {
            return;
        }

        const personalDetails = {
            name: document.querySelector(".bg-formulario input[placeholder='Nombre']").value,
            lastName: document.querySelector(".bg-formulario input[placeholder='Apellidos']").value,
            email: document.querySelector(".bg-formulario input[placeholder='Email']").value,
            phone: document.querySelector(".bg-formulario input[placeholder='Número de teléfono']").value,
        };

        const paymentDetails = {
            cardName: document.querySelector(".bg-formulario input[placeholder='Nombre de la tarjeta']").value,
            cardNumber: document.querySelector(".bg-formulario input[placeholder='Número de la tarjeta']").value,
            cvv: document.querySelector(".bg-formulario input[placeholder='CVV']").value,
            expiryDate: document.querySelector(".bg-formulario input[placeholder='Fecha de caducidad (MM/YY)']").value,
        };

        const addressDetails = {
            street: document.querySelector(".bg-formulario input[placeholder='Calle y número']").value,
            city: document.querySelector(".bg-formulario input[placeholder='Ciudad']").value,
            state: document.querySelector(".bg-formulario input[placeholder='Estado']").value,
            country: document.querySelector(".bg-formulario input[placeholder='País']").value,
            postalCode: document.querySelector(".bg-formulario input[placeholder='Código postal']").value,
        };

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

        const userOrders = JSON.parse(localStorage.getItem("userOrders")) || {};
        const userCart = userOrders[username] || [];

        userOrders[username] = [...userCart, completedOrder];
        localStorage.setItem("userOrders", JSON.stringify(userOrders));

        alert("¡Pedido completado! Gracias por tu compra.");
        localStorage.removeItem("shoppingCart");
        window.location.href = "miperfil.html";
    });


    cancelOrderBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    updateOrderSummary();
});