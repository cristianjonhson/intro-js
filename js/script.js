function calcularCosto() {
    const productos = [{
            nombre: "Producto 1",
            precio: 10
        },
        {
            nombre: "Producto 2",
            precio: 20
        },
        {
            nombre: "Producto 3",
            precio: 15
        },
    ];

    const servicios = [{
            nombre: "Servicio 1",
            precio: 30
        },
        {
            nombre: "Servicio 2",
            precio: 25
        },
    ];

    const iva = 0.19;

    while (true) {
        const seleccion = prompt(
            "Seleccione un producto o servicio:\n" +
            productos.map((producto, index) => `${index + 1} - ${producto.nombre} ($${producto.precio})`).join("\n") +
            "\n" +
            servicios.map((servicio, index) => `${productos.length + index + 1} - ${servicio.nombre} ($${servicio.precio})`).join("\n") +
            "\nPara salir, escriba 'salir'"
        );

        if (seleccion.toLowerCase() === "salir") {
            alert("Gracias por usar el simulador.");
            break;
        }

        const cantidad = parseInt(prompt("Ingrese la cantidad:"));
        let costoTotal = 0;

        const opcion = parseInt(seleccion);
        if (!isNaN(opcion) && opcion >= 1 && opcion <= productos.length + servicios.length) {
            if (opcion <= productos.length) {
                const precioSinIva = productos[opcion - 1].precio;
                costoTotal = (precioSinIva + precioSinIva * iva) * cantidad;
            } else {
                const precioSinIva = servicios[opcion - productos.length - 1].precio;
                costoTotal = (precioSinIva + precioSinIva * iva) * cantidad;
            }
            alert(`El costo total (con IVA) es: $${costoTotal}`);
        } else {
            alert("Opción no válida.");
        }
    }
}

calcularCosto(); // Llamada automática al cargar la página