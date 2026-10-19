const pantalla = document.getElementById("pantalla");

const listaHistorial = document.getElementById("lista-historial");
const mensajeHistorial = document.getElementById("historial-vacio");

const historial = [];

let numeroActual = "0";
let numeroAnterior = "";
let operacionActual = "";
let empezarNuevoNumero = false;

function actualizarPantalla() {
  pantalla.textContent = numeroActual;
}

function agregarNumero(numero) {
  if (empezarNuevoNumero) {
    numeroActual = "0";
    empezarNuevoNumero = false;
  }

  if (numero === ".") {
    if (numeroActual.includes(".")) return;
    numeroActual += ".";
  } else if (numeroActual === "0") {
    numeroActual = numero;
  } else {
    numeroActual += numero;
  }

  actualizarPantalla();
}

function seleccionarOperacion(operador) {
  if (numeroActual === "Error") return;

  if (operacionActual !== "" && !empezarNuevoNumero) {
    calcular();
    if (numeroActual === "Error") return;
  }

  numeroAnterior = numeroActual;
  operacionActual = operador;
  empezarNuevoNumero = true;
}

function calcular() {
  if (operacionActual === "" || empezarNuevoNumero) return;

  const anterior = Number(numeroAnterior);
  const actual = Number(numeroActual);
  let resultado;

  if (!Number.isFinite(anterior) || !Number.isFinite(actual)) {
    mostrarError();
    return;
  }

  switch (operacionActual) {
    case "+":
      resultado = anterior + actual;
      break;

    case "-":
      resultado = anterior - actual;
      break;

    case "*":
      resultado = anterior * actual;
      break;

    case "/":
      if (actual === 0) {
        mostrarError();
        return;
      }

      resultado = anterior / actual;
      break;

    default:
      return;
  }

  if (!Number.isFinite(resultado)) {
    mostrarError();
    return;
  }

  numeroActual = String(Number(resultado.toPrecision(12)));
  registrarOperacion(anterior, operacionActual, actual, numeroActual);
  numeroAnterior = "";
  operacionActual = "";
  empezarNuevoNumero = true;

  actualizarPantalla();
}

function limpiar() {
  numeroActual = "0";
  numeroAnterior = "";
  operacionActual = "";
  empezarNuevoNumero = false;

  actualizarPantalla();
}

function mostrarError() {
  limpiar();
  numeroActual = "Error";
  empezarNuevoNumero = true;

  actualizarPantalla();
}

function borrarUltimoDigito() {
  if (numeroActual === "Error") {
    limpiar();
    return;
  }

  if (empezarNuevoNumero) {
    return;
  }

  numeroActual = numeroActual.slice(0, -1);

  if (numeroActual === "" || numeroActual === "-") {
    numeroActual = "0";
  }

  actualizarPantalla();
}

function registrarOperacion(anterior, operador, actual, resultado) {
  const simbolos = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  const operacion =
    `${anterior} ${simbolos[operador]} ${actual} = ${resultado}`;

  historial.unshift(operacion);

  if (historial.length > 5) {
    historial.pop();
  }

  actualizarHistorial();
}

function actualizarHistorial() {
  listaHistorial.textContent = "";

  mensajeHistorial.hidden = historial.length > 0;

  for (const operacion of historial) {
    const elemento = document.createElement("li");

    elemento.textContent = operacion;

    listaHistorial.appendChild(elemento);
  }
}

const botonesNumeros = document.querySelectorAll("[data-numero]");

for (const boton of botonesNumeros) {
  boton.addEventListener("click", () => {
    agregarNumero(boton.dataset.numero);
  });
}

const botonesOperaciones = document.querySelectorAll("[data-operacion]");

for (const boton of botonesOperaciones) {
  boton.addEventListener("click", () => {
    seleccionarOperacion(boton.dataset.operacion);
  });
}

const botonBorrar = document.querySelector('[data-accion="limpiar"]');
const botonIgual = document.querySelector('[data-accion="calcular"]');

botonBorrar.addEventListener("click", limpiar);
botonIgual.addEventListener("click", calcular);

const botonRetroceso = document.querySelector(
  '[data-accion="retroceder"]'
);

botonRetroceso.addEventListener("click", borrarUltimoDigito);

document.addEventListener("keydown", (evento) => {
  if (evento.ctrlKey || evento.metaKey || evento.altKey) {
    return;
  }

  const tecla = evento.key;

  if (/^[0-9]$/.test(tecla)) {
    agregarNumero(tecla);
  } else if (tecla === "." || tecla === ",") {
    agregarNumero(".");
  } else if (["+", "-", "*", "/"].includes(tecla)) {
    seleccionarOperacion(tecla);
  } else if (tecla === "Enter" || tecla === "=") {
    calcular();
  } else if (tecla === "Backspace") {
    borrarUltimoDigito();
  } else if (tecla === "Escape" || tecla === "Delete") {
    limpiar();
  } else {
    return;
  }

  evento.preventDefault();
});

const interruptorTema = document.getElementById("interruptor-tema");

function actualizarTema() {
  document.body.classList.toggle("modo-oscuro", interruptorTema.checked);
}

interruptorTema.addEventListener("change", actualizarTema);

actualizarTema();
actualizarPantalla();