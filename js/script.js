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

function agregarAListaSeleccionados(nombre, precio, cantidad, listaSeleccionadosElement) {
  // Buscar si ya existe un elemento con el mismo nombre en la lista
  const listItem = Array.from(listaSeleccionadosElement.children).find(
    (element) => element.dataset.nombre === nombre
  );

  if (listItem) {
    // Si ya existe, actualizar la cantidad y el subtotal
    const cantidadInput = listItem.querySelector("input");
    cantidadInput.value = cantidad;

    // Calcular el nuevo subtotal
    const nuevoSubtotal = cantidad * precio;
    
    listItem.textContent = `${nombre} -  - Subtotal: $${nuevoSubtotal}`;

  } else {
    // Si no existe, crear un nuevo elemento
    const newItem = document.createElement("li");
    newItem.dataset.nombre = nombre;

    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.value = cantidad;
    cantidadInput.min = "1";
    cantidadInput.addEventListener("change", (event) => {
      const nuevaCantidad = parseInt(event.target.value);
      if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
        // Actualizar la cantidad y recalcular el subtotal
        cantidad = nuevaCantidad;
        const nuevoSubtotal = cantidad * precio;
        listItem.textContent = `${nombre}  - Subtotal: $${nuevoSubtotal}`;
        actualizarCostoTotal(); // Agrega esta línea para actualizar el costo total
      } else {
        alert("Ingrese una cantidad válida (mayor o igual a 1).");
        cantidadInput.value = cantidad;
      }
    });

    // Calcular el subtotal inicial
    const subtotalInicial = cantidad * precio;
    newItem.textContent = `${nombre}  - Subtotal: $${subtotalInicial}`;
    newItem.appendChild(cantidadInput);

    listaSeleccionadosElement.appendChild(newItem);

    // Agregar la nueva cantidad al costo total al agregar un nuevo elemento
    actualizarCostoTotal();
  }
}


function actualizarCostoTotal() {
  const iva = 0.19;

  let costoTotal = 0;
  let subtotalSeleccionados = 0;

  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

  // Recorrer los elementos en listaSeleccionadosElement
  for (const listItem of listaSeleccionadosElement.children) {
    const cantidadInput = listItem.querySelector('input[type="number"]');
    const cantidad = parseInt(cantidadInput.value);
    const precioTexto = listItem.textContent.match(/\$([\d,]+)/);
    const precio = parseFloat(precioTexto[1].replace(",", ""));

    // Calcular el subtotal para cada elemento y sumarlo al subtotal total
    subtotalSeleccionados += cantidad * precio;
  }

  // Calcular el costo total con IVA
  costoTotal = subtotalSeleccionados + subtotalSeleccionados * iva;

  // Actualizar el elemento HTML con los resultados
  const ivaElement = document.getElementById("iva");
  const resultadoElement = document.getElementById("resultado");

  ivaElement.innerHTML = `IVA 19%: $${subtotalSeleccionados * iva}`;
  resultadoElement.innerHTML = `El costo total (con IVA) es: $${costoTotal}`;
}


function mostrarProductosServicios() {
  const listaProductosElement = document.getElementById("listaProductos");
  const listaServiciosElement = document.getElementById("listaServicios");
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

function handleChange(input, producto) {
    const seleccionElement = document.getElementById(`seleccion-${input.id}`);
    input.checked ? (!seleccionElement && agregarAListaSeleccionados(producto.nombre, producto.precio, 1, listaSeleccionadosElement)) : (seleccionElement && listaSeleccionadosElement.removeChild(seleccionElement));
}
  

  function agregarCheckbox(label, producto, listaElement) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = label;
    input.value = `${label}-${producto.nombre}`;
    input.id = `${label}-${producto.nombre}`;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.textContent = `${producto.nombre} - $${producto.precio}`;
    checkboxLabel.htmlFor = input.id;

    input.addEventListener("change", () => handleChange(input, producto));

    listaElement.appendChild(input);
    listaElement.appendChild(checkboxLabel);
  }

  productos.forEach((producto, index) => {
    agregarCheckbox("productos", producto, listaProductosElement);
  });

  servicios.forEach((servicio, index) => {
    agregarCheckbox("servicios", servicio, listaServiciosElement);
  });
}

function calcularCosto() {
  const iva = 0.19;

  let costoTotal = 0;
  let subtotalSeleccionados = 0;

  const resultadoElement = document.getElementById("resultado");
  const ivaElement = document.getElementById("iva");
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

  // Recorrer los elementos en listaSeleccionadosElement
  for (const listItem of listaSeleccionadosElement.children) {
    const cantidadInput = listItem.querySelector('input[type="number"]');
    const cantidad = parseInt(cantidadInput.value);
    const precioTexto = listItem.textContent.match(/\$([\d,]+)/);
    const precio = parseFloat(precioTexto[1].replace(",", ""));

    // Calcular el subtotal para cada elemento y sumarlo al subtotal total
    subtotalSeleccionados += cantidad * precio;
  }

  // Calcular el costo total con IVA
  costoTotal = subtotalSeleccionados + subtotalSeleccionados * iva;

  // Actualizar el elemento HTML con los resultados
  ivaElement.innerHTML = `IVA 19%: $${subtotalSeleccionados * iva}`;
  resultadoElement.innerHTML = `El costo total (con IVA) es: $${costoTotal}`;
}


document.addEventListener("DOMContentLoaded", function () {
  mostrarProductosServicios();
  const calcularButton = document.createElement("button");
  calcularButton.textContent = "Calcular Costo";

  calcularButton.addEventListener("click", calcularCosto);

  document.body.appendChild(calcularButton);

  // Llamada inicial para actualizar el costo total al cargar la página
  actualizarCostoTotal();
});

function actualizarListaSeleccionados(seleccionados, listaSeleccionadosElement) {
  listaSeleccionadosElement.innerHTML = "";

  for (const nombre in seleccionados) {
    if (seleccionados.hasOwnProperty(nombre)) {
      const seleccion = seleccionados[nombre];
      agregarAListaSeleccionados(nombre, seleccion.precio, seleccion.cantidad, listaSeleccionadosElement);
    }
  }
}
