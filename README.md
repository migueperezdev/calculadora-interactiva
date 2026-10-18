# Calculadora interactiva

Calculadora web desarrollada con HTML, CSS y JavaScript como
proyecto de aprendizaje de Desarrollo Web en Entorno Cliente.

## Funcionalidades

- Suma, resta, multiplicación y división.
- Introducción de números decimales.
- Prevención de varios puntos decimales en un mismo número.
- Botón C para reiniciar la calculadora.
- Control de la división entre cero.
- Continuación de operaciones utilizando el resultado anterior.
- Diseño adaptable al ancho de la pantalla.

## Tecnologías utilizadas

- HTML para la estructura.
- CSS con Flexbox y Grid para el diseño.
- JavaScript para los cálculos y los eventos de los botones.

## Cómo utilizarla

1. Descarga o clona el repositorio.
2. Abre el archivo index.html en un navegador.
3. Introduce un número, selecciona una operación, escribe
   el segundo número y pulsa el botón igual.
4. Pulsa C para comenzar de nuevo.

## Archivos principales

- index.html: estructura, pantalla y botones.
- styles.css: presentación y distribución.
- script.js: estado, operaciones, validaciones y eventos.

## Comprobaciones realizadas

| Operación | Resultado |
|---|---|
| 5 + 3 | 8 |
| 9 - 12 | -3 |
| 6 × 4 | 24 |
| 8 ÷ 2 | 4 |
| 1.5 + 2.25 | 3.75 |
| 8 ÷ 0 | Error |

## Comportamiento de los cálculos

Los resultados se redondean a 12 cifras significativas.

Las operaciones encadenadas se resuelven en el orden de
pulsación: 2 + 3 × 4 produce 20.

## Posibles mejoras

- Historial de operaciones.
- Soporte para teclado.
- Borrado del último dígito.
- Tema claro y oscuro.