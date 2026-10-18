const pantalla = document.getElementById("pantalla");

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

actualizarPantalla();