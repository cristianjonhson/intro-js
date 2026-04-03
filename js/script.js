function calcularCosto() {
    const productos = [{
            nombre: "Producto 1",
            precio: 10000
        },
        {
            nombre: "Producto 2",
            precio: 20000
        },
        {
            nombre: "Producto 3",
            precio: 15000
        },
    ];

    const servicios = [{
            nombre: "Servicio 1",
            precio: 30000
        },
        {
            nombre: "Servicio 2",
            precio: 25000
        },
    ];

    const iva = 0.19;

    const conceptoTramites = [
        // Puedes agregar elementos de concepto tramites aquí
        {
            nombre: "Concepto 1",
            precio: 5000
        },
        {
            nombre: "Concepto 2",
            precio: 8000
        },
    ];

    while (true) {
        const seleccionInput = prompt(
            "Seleccione un producto, servicio o concepto de tramites:\n" +
            productos.map((producto, index) => `${index + 1} - ${producto.nombre} ($${producto.precio})`).join("\n") +
            "\n" +
            servicios.map((servicio, index) => `${productos.length + index + 1} - ${servicio.nombre} ($${servicio.precio})`).join("\n") +
            (conceptoTramites.length > 0 ?
                "\nConceptos de Tramites:\n" +
                conceptoTramites.map((concepto, index) => `${productos.length + servicios.length + index + 1} - ${concepto.nombre} ($${concepto.precio})`).join("\n") :
                "") +
            "\nPara salir, escriba 'salir'"
        );

        const seleccion = seleccionInput.trim().replace(/\D/g, '');

        if (seleccion.toLowerCase() === "salir") {
            alert("Gracias por usar el simulador.");
            break;
        }

        const cantidadInput = prompt("Ingrese la cantidad:");
        // Usar el método replace para eliminar caracteres no numéricos y el trim para eliminar espacios en blancos
        const cantidad = parseInt(cantidadInput.trim().replace(/\D/g, ''));

        if (!isNaN(cantidad)) {
            let costoTotal = 0;
            const opcion = parseInt(seleccion);

            if (!isNaN(opcion) && opcion >= 1 && opcion <= productos.length + servicios.length + conceptoTramites.length) {
                if (opcion <= productos.length) {
                    const precioSinIva = productos[opcion - 1].precio;
                    costoTotal = (precioSinIva + precioSinIva * iva) * cantidad;
                } else if (opcion <= productos.length + servicios.length) {
                    const precioSinIva = servicios[opcion - productos.length - 1].precio;
                    costoTotal = (precioSinIva + precioSinIva * iva) * cantidad;
                } else {
                    // Si la opción seleccionada está en el array de concepto de tramites
                    const conceptoTramite = conceptoTramites[opcion - productos.length - servicios.length - 1];
                    costoTotal = (conceptoTramite.precio + conceptoTramite.precio * iva) * cantidad;
                }
                alert(`El costo total (con IVA) es: $${costoTotal}`);
            } else {
                alert("Opción no válida. Ingrese un número válido.");
            }
        } else {
            alert("Cantidad no válida. Ingrese un número válido.");
        }
    }
}

calcularCosto(); // Llamada automática al cargar la página