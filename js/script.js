function calcularCosto() {
    while (true) {
        const producto = prompt("Seleccione un producto o servicio:\n1 - Producto 1 ($10)\n2 - Producto 2 ($20)\n3 - Producto 3 ($15)\n4 - Servicio 1 ($30)\n5 - Servicio 2 ($25)\n\nPara salir, escriba 'salir'");
        if (producto.toLowerCase() === 'salir') {
            alert("Gracias por usar el simulador.");
            break; // Salir del bucle si el usuario escribe 'salir'
        }
        const cantidad = parseInt(prompt("Ingrese la cantidad:"));
        let costoTotal = 0;

        // Aplicar un condicional para calcular el costo total según la selección
        switch (producto) {
            case "1":
                costoTotal = 10 * cantidad;
                break;
            case "2":
                costoTotal = 20 * cantidad;
                break;
            case "3":
                costoTotal = 15 * cantidad;
                break;
            case "4":
                costoTotal = 30 * cantidad;
                break;
            case "5":
                costoTotal = 25 * cantidad;
                break;
            default:
                alert("Opción no válida.");
                continue; // Volver al inicio del bucle si la opción no es válida
        }

        alert(`El costo total es: $${costoTotal}`);
    }
}

calcularCosto(); // Llamada automática al cargar la página