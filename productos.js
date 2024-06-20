document.addEventListener("DOMContentLoaded", () => {
    fetch("baseDeDatos.json")
        .then(response => response.json())
        .then(data => {
            let listaProductos = document.getElementById("lista-productos");
            data.productos.forEach(producto => {
                let divProducto = document.createElement("div");
                divProducto.classList.add("producto");
                divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p>Precio: $${producto.precio}</p>
                    <button data-id="${producto.id}">Agregar al Carrito</button>
                `;
                listaProductos.appendChild(divProducto);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            alert("No se pudieron cargar los productos.");
        });
});
