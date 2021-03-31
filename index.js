const $cuadros = document.querySelectorAll(".cuadro");
const $tablero = document.querySelector("#tablero");
const $finJuego = document.querySelector("#finJuego");
let $primerCuadro = null;
let turnos = 0;
function configurarJuego() {
  const coloresBase = ["rojo", "verde", "azul", "amarillo", "negro", "blanco"];
  const coloresRepetidos = coloresBase.concat(coloresBase);
  configurarCuadros(coloresRepetidos);
}

function configurarCuadros(colores) {
  const coloresRandom = colores.sort(function () {
    return 0.5 - Math.random();
  });

  coloresRandom.forEach(function (color, i) {
    $cuadros[i].classList.add(color);
  });
}

// function manejarEventos() {]
$tablero.onclick = function (e) {
  const $elemento = e.target;
  if ($elemento.classList.contains("cuadro")) {
    manejarClickCuadro($elemento);
  }
};

function manejarClickCuadro(cuadroClickeado) {
  mostrarCuadro(cuadroClickeado);
  if ($primerCuadro === null) {
    $primerCuadro = cuadroClickeado;
  } else {
    if ($primerCuadro === cuadroClickeado) {
      return;
    }
    turnos++;
    if (cuadrosSonIguales($primerCuadro, cuadroClickeado)) {
      eliminarCuadro($primerCuadro);
      eliminarCuadro(cuadroClickeado);
    } else {
      ocultarCuadro($primerCuadro);
      ocultarCuadro(cuadroClickeado);
    }
    $primerCuadro = null;
  }
}
function cuadrosSonIguales(cuadro1, cuadro2) {
  return cuadro1.className === cuadro2.className;
}

function eliminarCuadro(cuadro) {
  setTimeout(() => {
    cuadro.parentElement.style.background = "grey";
    cuadro.remove();
    evaluarFin();
  }, 500);
}

function ocultarCuadro(cuadro) {
  setTimeout(() => {
    cuadro.style.opacity = "0";
  }, 500);
}

function mostrarCuadro(cuadro) {
  cuadro.style.opacity = "1";
}

function evaluarFin() {
  const $cuadros = document.querySelectorAll(".cuadro");
  if ($cuadros.length === 0) {
    $tablero.style.display = "none";
    $finJuego.style.display = "block";
    document.querySelector("strong").textContent = turnos.toString();
  }
}

configurarJuego();
