const productos = [
  { nombre: "Producto 1", precio: 10000 },
  { nombre: "Producto 2", precio: 20000 },
  { nombre: "Producto 3", precio: 15000 },
];

const servicios = [
  { nombre: "Servicio 1", precio: 30000 },
  { nombre: "Servicio 2", precio: 25000 },
];

const conceptoTramites = [
  { nombre: "Concepto 1", precio: 5000 },
  { nombre: "Concepto 2", precio: 8000 },
];

const IVA = 0.19;

function formatearMoneda(valor) {
  return Number(valor).toLocaleString("es-CL");
}

function actualizarSubtotalItem(listItem) {
  const precio = Number(listItem.dataset.precio);
  const cantidadInput = listItem.querySelector('input[type="number"]');
  const cantidad = Number(cantidadInput.value) || 1;

  const subtotal = precio * cantidad;
  const subtotalElement = listItem.querySelector(".subtotal");
  subtotalElement.textContent = `Subtotal: $${formatearMoneda(subtotal)}`;
}

function crearItemSeleccionado(nombre, precio, cantidad) {
  const listItem = document.createElement("li");
  listItem.dataset.nombre = nombre;
  listItem.dataset.precio = String(precio);

  const nombreSpan = document.createElement("span");
  nombreSpan.className = "nombre-item";
  nombreSpan.textContent = `${nombre} - Precio unitario: $${formatearMoneda(precio)} `;

  const cantidadLabel = document.createElement("span");
  cantidadLabel.textContent = "Cantidad: ";

  const cantidadInput = document.createElement("input");
  cantidadInput.type = "number";
  cantidadInput.min = "1";
  cantidadInput.value = cantidad;

  const subtotalSpan = document.createElement("span");
  subtotalSpan.className = "subtotal";

  cantidadInput.addEventListener("change", (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);

    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
      actualizarSubtotalItem(listItem);
      actualizarCostoTotal();
      actualizarLocalStorage();
    } else {
      alert("Ingrese una cantidad válida (mayor o igual a 1).");
      event.target.value = "1";
      actualizarSubtotalItem(listItem);
      actualizarCostoTotal();
      actualizarLocalStorage();
    }
  });

  listItem.appendChild(nombreSpan);
  listItem.appendChild(cantidadLabel);
  listItem.appendChild(cantidadInput);
  listItem.appendChild(document.createTextNode(" - "));
  listItem.appendChild(subtotalSpan);

  actualizarSubtotalItem(listItem);

  return listItem;
}

function agregarAListaSeleccionados(nombre, precio, cantidad, listaSeleccionadosElement) {
  let listItem = Array.from(listaSeleccionadosElement.children).find(
    (element) => element.dataset.nombre === nombre
  );

  if (listItem) {
    listItem.dataset.precio = String(precio);
    const cantidadInput = listItem.querySelector('input[type="number"]');
    cantidadInput.value = cantidad;
    actualizarSubtotalItem(listItem);
  } else {
    listItem = crearItemSeleccionado(nombre, precio, cantidad);
    listaSeleccionadosElement.appendChild(listItem);
  }

  actualizarCostoTotal();
  actualizarLocalStorage();
}

function eliminarDeListaSeleccionados(nombre) {
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

  const listItem = Array.from(listaSeleccionadosElement.children).find(
    (element) => element.dataset.nombre === nombre
  );

  if (listItem) {
    listItem.remove();
    actualizarCostoTotal();
    actualizarLocalStorage();
  }
}

function actualizarEstadoBotonCalcular() {
  const calcularButton = document.getElementById("calcularCostoBtn");
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-nombre]');

  if (!calcularButton || !listaSeleccionadosElement) {
    return;
  }

  const tieneSeleccionPorCheckbox = Array.from(checkboxes).some((checkbox) => checkbox.checked);
  const tieneSeleccionPorLista = listaSeleccionadosElement.children.length > 0;
  const tieneSeleccion = tieneSeleccionPorCheckbox || tieneSeleccionPorLista;
  calcularButton.disabled = !tieneSeleccion;
}

function ocultarResultados() {
  const ivaElement = document.getElementById("iva");
  const resultadoElement = document.getElementById("resultado");

  if (!ivaElement || !resultadoElement) {
    return;
  }

  ivaElement.textContent = "";
  resultadoElement.textContent = "";
  ivaElement.hidden = true;
  resultadoElement.hidden = true;
}

function obtenerTotalesSeleccionados() {
  let subtotalSeleccionados = 0;
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

  if (!listaSeleccionadosElement) {
    return {
      montoIva: 0,
      costoTotal: 0,
    };
  }

  for (const listItem of listaSeleccionadosElement.children) {
    const precio = Number(listItem.dataset.precio);
    const cantidadInput = listItem.querySelector('input[type="number"]');
    const cantidad = Number(cantidadInput.value) || 1;

    subtotalSeleccionados += precio * cantidad;
  }

  const montoIva = subtotalSeleccionados * IVA;
  const costoTotal = subtotalSeleccionados + montoIva;

  return {
    montoIva,
    costoTotal,
  };
}

function actualizarCostoTotal(mostrarResultado = false) {
  const { montoIva, costoTotal } = obtenerTotalesSeleccionados();

  const ivaElement = document.getElementById("iva");
  const resultadoElement = document.getElementById("resultado");

  if (ivaElement && resultadoElement && mostrarResultado) {
    ivaElement.textContent = `IVA 19%: $${formatearMoneda(montoIva)}`;
    resultadoElement.textContent = `El costo total (con IVA) es: $${formatearMoneda(costoTotal)}`;
    ivaElement.hidden = false;
    resultadoElement.hidden = false;
  } else {
    ocultarResultados();
  }

  actualizarEstadoBotonCalcular();
}

function crearCheckbox(item, grupo, listaElement, listaSeleccionadosElement) {
  const contenedor = document.createElement("div");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `${grupo}-${item.nombre.replace(/\s+/g, "-").toLowerCase()}`;
  input.dataset.nombre = item.nombre;
  input.dataset.precio = String(item.precio);

  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.textContent = `${item.nombre} - $${formatearMoneda(item.precio)}`;

  input.addEventListener("change", () => {
    if (input.checked) {
      agregarAListaSeleccionados(item.nombre, item.precio, 1, listaSeleccionadosElement);
    } else {
      eliminarDeListaSeleccionados(item.nombre);
    }

    actualizarEstadoBotonCalcular();
  });

  contenedor.appendChild(input);
  contenedor.appendChild(label);
  listaElement.appendChild(contenedor);
}

function renderizarCategoria(items, grupo, listaElement, listaSeleccionadosElement, mensajeVacio) {
  if (!listaElement) {
    return;
  }

  listaElement.innerHTML = "";

  if (!Array.isArray(items) || items.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = mensajeVacio;
    listaElement.appendChild(aviso);
    return;
  }

  items.forEach((item) => {
    crearCheckbox(item, grupo, listaElement, listaSeleccionadosElement);
  });
}

function mostrarProductosServicios() {
  const listaProductosElement = document.getElementById("listaProductos");
  const listaServiciosElement = document.getElementById("listaServicios");
  const listaConceptosElement = document.getElementById("listaConceptos");
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

  renderizarCategoria(productos, "productos", listaProductosElement, listaSeleccionadosElement, "No hay productos disponibles.");
  renderizarCategoria(servicios, "servicios", listaServiciosElement, listaSeleccionadosElement, "No hay servicios disponibles.");
  renderizarCategoria(conceptoTramites, "conceptos", listaConceptosElement, listaSeleccionadosElement, "No hay conceptos de tramites disponibles.");
}

function mostrarSweetAlert() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "¿Desea calcular el costo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Calcular",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

function calcularCosto() {
  mostrarSweetAlert()
    .then(() => {
      actualizarCostoTotal(true);

      Toastify({
        text: "¡Cálculo completado!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    })
    .catch(() => {
      console.log("Operación cancelada");
    });
}

function actualizarLocalStorage() {
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");
  const seleccionados = {};

  for (const listItem of listaSeleccionadosElement.children) {
    const nombre = listItem.dataset.nombre;
    const precio = Number(listItem.dataset.precio);
    const cantidad = Number(listItem.querySelector('input[type="number"]').value) || 1;

    seleccionados[nombre] = {
      precio,
      cantidad,
    };
  }

  localStorage.setItem("seleccionados", JSON.stringify(seleccionados));
}

function obtenerSeleccionadosDesdeLocalStorage() {
  const seleccionadosString = localStorage.getItem("seleccionados");
  return seleccionadosString ? JSON.parse(seleccionadosString) : {};
}

function actualizarListaSeleccionados(seleccionados, listaSeleccionadosElement) {
  listaSeleccionadosElement.innerHTML = "";

  Object.keys(seleccionados).forEach((nombre) => {
    const seleccion = seleccionados[nombre];
    agregarAListaSeleccionados(nombre, seleccion.precio, seleccion.cantidad, listaSeleccionadosElement);
  });
}

function sincronizarCheckboxes(seleccionados) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-nombre]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = Boolean(seleccionados[checkbox.dataset.nombre]);
  });
}

function inicializarApp() {
  mostrarProductosServicios();

  const seleccionados = obtenerSeleccionadosDesdeLocalStorage();
  const listaSeleccionadosElement = document.getElementById("listaSeleccionados");

  if (!listaSeleccionadosElement) {
    console.error("No se encontro el elemento listaSeleccionados en el HTML.");
    return;
  }

  actualizarListaSeleccionados(seleccionados, listaSeleccionadosElement);
  sincronizarCheckboxes(seleccionados);
  actualizarCostoTotal(false);

  let calcularButton = document.getElementById("calcularCostoBtn");

  if (!calcularButton) {
    calcularButton = document.createElement("button");
    calcularButton.id = "calcularCostoBtn";
    calcularButton.className = "action-button";
    calcularButton.textContent = "Calcular Costo";
    calcularButton.type = "button";
    const totalCard = document.querySelector(".total-card");
    const ivaElement = document.getElementById("iva");

    if (totalCard && ivaElement) {
      totalCard.insertBefore(calcularButton, ivaElement);
    } else if (totalCard) {
      totalCard.appendChild(calcularButton);
    } else {
      document.body.appendChild(calcularButton);
    }
  }

  actualizarEstadoBotonCalcular();
  ocultarResultados();

  calcularButton.addEventListener("click", calcularCosto);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarApp);
} else {
  inicializarApp();
}
