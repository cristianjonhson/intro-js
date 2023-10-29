function calcularCosto() {
    const productos = [
      {
        nombre: "Producto 1",
        precio: 10000,
      },
      {
        nombre: "Producto 2",
        precio: 20000,
      },
      {
        nombre: "Producto 3",
        precio: 15000,
      },
    ];
  
    const servicios = [
      {
        nombre: "Servicio 1",
        precio: 30000,
      },
      {
        nombre: "Servicio 2",
        precio: 25000,
      },
    ];
  
    const iva = 0.19;
  
    // Array de mensajes de bienvenida aleatorios
    const mensajesBienvenida = [
      "¡Bienvenido al Simulador de Costo!",
      "Hola, ¿en qué puedo ayudarte hoy?",
      "Bienvenido, comencemos a calcular costos.",
    ];
  
    // Mostrar un mensaje de bienvenida aleatorio
    const mensajeBienvenida = mensajesBienvenida[Math.floor(Math.random() * mensajesBienvenida.length)];
    alert(mensajeBienvenida);
  
    let montoIngresado = false; // Variable para rastrear si se ha ingresado un monto
    let resultadoElement = document.getElementById("resultado");
  
    while (true) {
      const seleccionInput = prompt(
        "Seleccione un producto o servicio:\n" +
          productos
            .map(
              (producto, index) =>
                `${index + 1} - ${producto.nombre} ($${producto.precio})`
            )
            .join("\n") +
          "\n" +
          servicios
            .map(
              (servicio, index) =>
                `${productos.length + index + 1} - ${servicio.nombre} ($${
                  servicio.precio
                })`
            )
            .join("\n") +
          "\nSi termino de calcular, escriba 'salir'"
      );
  
      const seleccion = seleccionInput ? seleccionInput.trim() : "";
  
      if (seleccion.toLowerCase() === "salir") {
        if (!montoIngresado) {
          resultadoElement.textContent = "No se ha realizado ningún cálculo.";
        }
        alert("Gracias por usar el simulador.");
        break;
      }
  
      const cantidadInput = prompt("Ingrese la cantidad:");
      const cantidad = parseInt(cantidadInput.trim().replace(/\D/g, ""));
  
      if (!isNaN(cantidad)) {
        let costoTotal = 0;
        const opcion = parseInt(seleccion);
        if (
          !isNaN(opcion) &&
          opcion >= 1 &&
          opcion <= productos.length + servicios.length
        ) {
          if (opcion <= productos.length) {
            const precioSinIva = productos[opcion - 1].precio;
            costoTotal = (precioSinIva + precioSinIva * iva) * cantidad;
          } else {
            const precioSinIva = servicios[opcion - productos.length - 1].precio;
            costoTotal = (precioSinIva + precioSinIva * iva) * cantidad;
          }
          resultadoElement.textContent = `El costo total (con IVA) es: $${costoTotal}`;
          // Indicar que se ha ingresado un monto
          montoIngresado = true;
        } else {
          alert("Opción no válida. Ingrese un número válido.");
        }
      } else {
        alert("Cantidad no válida. Ingrese un número válido.");
      }
    }
  }
  
  // Esperar a que el documento HTML se cargue completamente
  document.addEventListener("DOMContentLoaded", function () {
    // Obtener el botón por su ID
    const calcularButton = document.createElement("button");
    calcularButton.textContent = "Calcular Costo";
      
    // Agregar un evento de clic al botón
    calcularButton.addEventListener("click", calcularCosto);
  
    // Agregar el botón al cuerpo del documento
    document.body.appendChild(calcularButton);
    });
  
  // Capturar la tecla "Enter" en el campo de entrada de cantidad
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar que se procese el "Enter" por defecto (p. ej., envío de formularios)
      calcularCosto(); // Llamar a la función calcularCosto al presionar "Enter"
    }
  });
  