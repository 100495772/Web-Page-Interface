document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    // Actualiza el contador del carrito
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Actualiza el contenido del carrito
    function updateCartModal() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = `
                <div>
                    <strong>${item.package}</strong><br>
                    Fecha: ${item.date}<br>
                    Cantidad: ${item.quantity}<br>
                    Precio unitario: ${item.price} €<br>
                    Subtotal: ${item.subtotal} €
                </div>
                <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
            `;
            total += item.subtotal;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
        addRemoveListeners();
    }

    // Añadir evento para eliminar un artículo del carrito
    function addRemoveListeners() {
        document.querySelectorAll("#cartItems .btn-danger").forEach((btn) => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("shoppingCart", JSON.stringify(cart));
                updateCartCount();
                updateCartModal();
            });
        });
    }

    // Añadir un artículo al carrito
    function addToCart(packageName, date, quantity, price) {
        const subtotal = quantity * price;
        cart.push({
            package: packageName,
            date,
            quantity,
            price,
            subtotal
        });
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        updateCartCount();
    }

    // Manejar el clic en los botones "Añadir al carrito"
    document.querySelectorAll(".paquete-card .btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const packageName = index === 0 ? "Paquete de Viaje: Experiencia completa" : "Paquete de Viaje: Aventura navideña";
            const date = document.getElementById(index === 0 ? "date-completa" : "date-navideña").value;
            const quantity = parseInt(document.getElementById(index === 0 ? "cantidad-completa" : "cantidad-navidena").value, 10);
            const price = index === 0 ? 30 : 20;

            if (!date) {
                alert("Por favor, selecciona una fecha.");
                return;
            }

            addToCart(packageName, date, quantity, price);
            alert("¡Artículo añadido al carrito!");
        });
    });

    // Manejar el clic en el botón "Proceder al Pago"
    const proceedToPaymentBtn = document.querySelector(".btn-success");
    if (proceedToPaymentBtn) {
        proceedToPaymentBtn.addEventListener("click", (e) => {
            if (cart.length === 0) {
                e.preventDefault(); // Evita que el enlace redirija a otra página
                alert("Tu carrito está vacío. Agrega artículos antes de proceder al pago.");
                return;
            }
            window.location.href = "confirmar-pago.html"; // Redirige al pago si el carrito no está vacío
        });
    }

    // Mostrar el carrito al hacer clic en el icono de carrito
    document.getElementById("btnCart").addEventListener("click", () => {
        updateCartModal();
        const modal = new bootstrap.Modal(document.getElementById("cartModal"));
        modal.show();
    });

    // Actualizar el contador inicial del carrito
    updateCartCount();
});
