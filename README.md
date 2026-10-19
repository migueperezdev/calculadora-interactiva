# Calculadora interactiva

Proyecto de aprendizaje de Desarrollo Web en Entorno Cliente,
desarrollado con HTML, CSS y JavaScript.

## Funcionalidades

- Suma, resta, multiplicación y división.
- Números decimales con validación de un único punto.
- Botón C para reiniciar el cálculo.
- Botón de retroceso para borrar el último dígito.
- Uso mediante botones y teclado.
- Historial de las cinco últimas operaciones correctas.
- Selección de modo claro y oscuro.
- Control de división entre cero y resultados no finitos.
- Diseño adaptable al ancho de la pantalla.

## Cómo utilizarla

1. Descarga o clona el repositorio.
2. Abre index.html en un navegador.
3. Introduce un número, selecciona una operación, introduce
   el segundo número y pulsa igual o Enter.
4. Marca o desmarca «Modo oscuro» para cambiar el tema.

## Tarea final: implementación de las mejoras

Se añadieron cuatro funcionalidades y se mantuvo y comprobó
la validación de decimales de la versión inicial.

### 1. Borrado del último dígito

Se añadió un botón de retroceso en HTML y se ajustó la
distribución de la primera fila mediante CSS Grid.

En JavaScript se creó borrarUltimoDigito(), que utiliza
slice(0, -1) para eliminar el último carácter del número
en edición. Si queda vacío, muestra cero.

Esto permite corregir la entrada sin reiniciar todo el cálculo.
La misma función se utiliza con la tecla Backspace.

### 2. Soporte para teclado

Se añadió un evento keydown que identifica la tecla pulsada
mediante evento.key y llama a las funciones existentes.

Así, botones y teclado comparten los cálculos y validaciones.
preventDefault() cancela la acción habitual del navegador
para las teclas gestionadas, evitando activaciones duplicadas.

### 3. Historial de operaciones

Se añadió una sección HTML y un array llamado historial.

registrarOperacion() introduce cada operación correcta al
principio mediante unshift(). Si hay más de cinco, pop()
elimina la más antigua.

actualizarHistorial() crea los elementos de la lista con
createElement(), textContent y appendChild() para mostrar
los resultados anteriores.

### 4. Modo claro y oscuro

Se definieron los colores mediante variables de CSS.
La clase modo-oscuro del body establece los colores alternativos.

Una casilla genera un evento change. JavaScript consulta
checked y utiliza classList.toggle() para añadir o quitar
la clase según esté marcada.

Esto cambia la apariencia conservando el cálculo y el historial.

### 5. Validación de decimales

La función agregarNumero() comprueba numeroActual.includes(".")
antes de añadir un punto. Si ya existe uno, rechaza otro.

Esta validación ya estaba implementada y se ha comprobado
también con el teclado. La coma del teclado se convierte
en punto para mantener un único separador interno.

## Controles del teclado

| Tecla | Acción |
|---|---|
| 0–9 | Introducir números |
| Punto o coma | Introducir el separador decimal |
| +, -, *, / | Seleccionar una operación |
| Enter o = | Calcular |
| Backspace | Borrar el último dígito |
| Esc o Supr | Reiniciar el cálculo |
| Tab | Mover el foco entre controles |
| Espacio | Activar el control que tiene el foco |

## Comportamiento de la calculadora

- Los resultados se redondean a 12 cifras significativas.
- Las operaciones encadenadas se resuelven en el orden de
  pulsación: 2 + 3 × 4 produce 20.
- El retroceso corrige el número que se está escribiendo.
- Las operaciones con error no se añaden al historial.
- C reinicia el cálculo y conserva el historial.
- El historial se guarda en memoria y se vacía al recargar.

## Comprobaciones manuales

| Prueba | Resultado esperado |
|---|---|
| 5 + 3 | 8 |
| 9 - 12 | -3 |
| 0.1 + 0.2 | 0.3 |
| 8 ÷ 0 | Error |
| Escribir 123 y pulsar retroceso | 12 |
| Escribir 1..2,,3 con el teclado | 1.23 |
| Completar seis operaciones correctas | Se conservan las cinco últimas |
| Cambiar el tema | Cambian los colores y se conserva el historial |

## Archivos del proyecto

- index.html: estructura y controles.
- styles.css: distribución, presentación y temas.
- script.js: cálculos, validaciones, eventos e historial.
- README.md: documentación del proyecto.
- .gitignore: exclusión de archivos ajenos al código.