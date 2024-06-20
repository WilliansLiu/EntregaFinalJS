document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];

    document.getElementById("lista-productos").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const idProducto = e.target.getAttribute("data-id");
            agregarAlCarrito(idProducto);
        }
    });

    document.getElementById("formulario-pago").addEventListener("submit", (e) => {
        e.preventDefault();
        procesarPago();
    });

    function agregarAlCarrito(idProducto) {
        fetch("baseDeDatos.json")
            .then(response => response.json())
            .then(data => {
                const producto = data.productos.find(p => p.id == idProducto);
                carrito.push(producto);
                actualizarCarrito();
            })
            .catch(error => {
                console.error("Error al agregar al carrito:", error);
                alert("No se pudo agregar el producto al carrito.");
            });
    }

    function actualizarCarrito() {
        let contenidoCarrito = document.getElementById("contenido-carrito");
        contenidoCarrito.innerHTML = "";
        carrito.forEach(item => {
            let divItem = document.createElement("div");
            divItem.classList.add("item-carrito");
            divItem.innerHTML = `
                <h4>${item.nombre}</h4>
                <p>Precio: $${item.precio}</p>
            `;
            contenidoCarrito.appendChild(divItem);
        });
    // Calcula el total del carrito
    calcularTotal();
}

function calcularTotal() {
    let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    let totalDiv = document.getElementById("total-carrito");
    
    if (!totalDiv) {
        totalDiv = document.createElement("div");
        totalDiv.id = "total-carrito";
        document.getElementById("carrito").appendChild(totalDiv);
    }

    totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

    function procesarPago() {
        try {
            const nombre = document.getElementById("nombre").value;
            const tarjeta = document.getElementById("tarjeta").value;
            const fechaExpiracion = document.getElementById("fecha-expiracion").value;
            const cvv = document.getElementById("cvv").value;

            if (!nombre || !tarjeta || !fechaExpiracion || !cvv) {
                throw new Error("Todos los campos son obligatorios");
            }

            alert("Pago procesado correctamente. ¡Gracias por su compra!");
        } catch (error) {
            alert(`Error en el pago: ${error.message}`);
        }
    }
});
