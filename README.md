# Simulador de Costo de Productos, Servicios y Tramites

Aplicacion web en JavaScript vanilla para calcular el costo total con IVA (19%) de una seleccion de productos, servicios y conceptos de tramites.

## Caracteristicas

- Render dinamico de categorias desde JavaScript:
	- Productos
	- Servicios
	- Conceptos de tramites
- Seleccion con checkboxes.
- Cantidad editable por item seleccionado.
- Calculo de subtotal por item y total final con IVA.
- Confirmacion de calculo con SweetAlert2.
- Notificacion de calculo completado con Toastify.
- Persistencia de seleccion mediante localStorage.
- Boton de calcular generado desde JavaScript.
- Resultado (IVA y total) oculto hasta confirmar el calculo.

## Estructura del proyecto

```text
index.html
css/
	style.css
js/
	script.js
```

## Como ejecutar

1. Clona el repositorio.
2. Inicia un servidor local desde la carpeta del proyecto.
3. Abre la URL local en tu navegador.

Ejemplo con Python:

```bash
python3 -m http.server 5500
```

Luego abre:

```text
http://localhost:5500
```

## Flujo de uso

1. Marca uno o mas items en Productos, Servicios o Conceptos de tramites.
2. Ajusta cantidades en la seccion de Selecciones.
3. Presiona Calcular Costo.
4. Confirma en el modal de SweetAlert.
5. Se mostraran IVA y costo total en la seccion Calculo.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- SweetAlert2 (CDN)
- Toastify (CDN)

## Notas

- Si no hay items seleccionados, el boton de calcular se mantiene deshabilitado.
- El resultado no se muestra hasta confirmar el calculo.

## Repositorio

[https://github.com/cristianjonhson/intro-js](https://github.com/cristianjonhson/intro-js)
