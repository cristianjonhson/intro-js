# Simulador de Costo de Productos y Servicios

Este es un proyecto simple de JavaScript que permite a los usuarios calcular el costo total de productos y servicios seleccionados. Los usuarios pueden seleccionar un producto o servicio, ingresar la cantidad y el sistema calculará el costo total.

## Funcionamiento

1. Abra `index.html` en su navegador web.
2. Se le pedirá que seleccione un producto o servicio ingresando un número del 1 al 5. También puede escribir "salir" para finalizar el programa.
3. Luego, ingrese la cantidad que desea comprar.
4. El programa calculará y mostrará el costo total.
5. Puede repetir este proceso tantas veces como desee hasta que escriba "salir" para finalizar.

## Cambios Realizados

Se realizaron varias mejoras en el código y la funcionalidad del simulador:

- **Mejora en la Interfaz de Usuario**: Se implementó una interfaz más amigable y comprensible para los usuarios.

- **Manejo de Errores Mejorado**: Se añadieron mensajes de error más descriptivos y se mejoró la gestión de errores.

- **Fetch de Datos desde un Archivo JSON**: En lugar de tener los datos directamente en el código, ahora se realizan solicitudes Fetch para obtener los productos y servicios desde un archivo JSON.

- **Implementación de Promesas y `async/await`**: Se implementó el uso de promesas y `async/await` para mejorar la estructura del código y hacerlo más fácil de entender.

## Uso

Puede clonar este repositorio y abrir `index.html` en su navegador [Simulador de Costo](https://github.com/cristianjonhson/intro-js)

## Contribuciones

Siéntase libre de contribuir a este proyecto. Puede mejorar el código, agregar nuevas características o solucionar problemas si los encuentra.

1. Fork (haga una copia) de este repositorio.
2. Cree su rama de características (`git checkout -b feature/nueva-caracteristica`).
3. Commit (haga confirmaciones) de sus cambios (`git commit -m 'Agrega nueva característica'`).
4. Empuje (suba) su rama de características (`git push origin feature/nueva-caracteristica`).
5. Abra una solicitud de extracción (pull request).

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](LICENSE) para obtener más detalles.

---

Creado por [CristianJonhson]
