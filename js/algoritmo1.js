// ----------------- Algoritmo 1 -----------------
// Función para calcular el perímetro del triángulo
function calcularPerimetroTriangulo() {
  // Datos
  const ladoADelTriangulo = parseFloat(document.getElementById("ladoADelTriangulo").value);
  const ladoBDelTriangulo = parseFloat(document.getElementById("ladoBDelTriangulo").value);
  const ladoCDelTriangulo = parseFloat(document.getElementById("ladoCDelTriangulo").value);

  // Cálculo del perímetro
  let perimetroDelTriangulo = ladoADelTriangulo + ladoBDelTriangulo + ladoCDelTriangulo;

  document.getElementById("resultadoPTriangulo").innerText = perimetroDelTriangulo.toFixed(2);
}

// Función para calcular el área del triángulo
function calcularAreaTriangulo() {
  // Datos
  const baseDelTriangulo = parseFloat(document.getElementById("baseDelTriangulo").value);
  const alturaDelTriangulo = parseFloat(document.getElementById("alturaDelTriangulo").value);

  // Cálculo del área
  let areaDelTriangulo = (baseDelTriangulo * alturaDelTriangulo) / 2;

  document.getElementById("resultadoATriangulo").innerText = areaDelTriangulo.toFixed(2);
}

// Función para calcular el perímetro del rectángulo
function calcularPerimetroRectangulo() {
  // Datos
  const ladoADelRectangulo = parseFloat(document.getElementById("ladoADelRectangulo").value);
  const ladoBDelRectangulo = parseFloat(document.getElementById("ladoBDelRectangulo").value);

  // Cálculo del perímetro
  let perimetroDelRectangulo = 2 * (ladoADelRectangulo + ladoBDelRectangulo);

  document.getElementById("resultadoPRectangulo").innerText = perimetroDelRectangulo.toFixed(2);
}

// Función para calcular el área del rectángulo
function calcularAreaRectangulo() {
  // Datos
  const ladoADelRectangulo = parseFloat(document.getElementById("ladoADelRectangulo").value);
  const ladoBDelRectangulo = parseFloat(document.getElementById("ladoBDelRectangulo").value);

  // Cálculo del área
  let areaDelRectangulo = ladoADelRectangulo * ladoBDelRectangulo;

  document.getElementById("resultadoARectangulo").innerText = areaDelRectangulo.toFixed(2);
}

// Función para calcular el perímetro del cuadrado
function calcularPerimetroCuadrado() {
  // Datos
  const ladoDelCuadrado = parseFloat(document.getElementById("ladoDelCuadrado").value);

  // Cálculo del perímetro
  let perimetroDelCuadrado = 4 * ladoDelCuadrado;

  document.getElementById("resultadoPCuadrado").innerText = perimetroDelCuadrado.toFixed(2);
}

// Función para calcular el área del cuadrado
function calcularAreaCuadrado() {
  // Datos
  const ladoDelCuadrado = parseFloat(document.getElementById("ladoDelCuadrado").value);

  // Cálculo del área
  let areaDelCuadrado = ladoDelCuadrado * ladoDelCuadrado;

  document.getElementById("resultadoACuadrado").innerText = areaDelCuadrado.toFixed(2);
}

// Función para calcular el perímetro del círculo
function calcularPerimetroCirculo() {
  // Datos
  const radioDelCirculo = parseFloat(document.getElementById("radioDelCirculo").value);

  // Cálculo del perímetro
  let perimetroDelCirculo = 2 * Math.PI * radioDelCirculo;

  document.getElementById("resultadoPCirculo").innerText = perimetroDelCirculo.toFixed(2);
}

// Función para calcular el área del círculo
function calcularAreaCirculo() {
  // Datos
  const radioDelCirculo = parseFloat(document.getElementById("radioDelCirculo").value);

  // Cálculo del área
  let areaDelCirculo = Math.PI * radioDelCirculo * radioDelCirculo;

  document.getElementById("resultadoACirculo").innerText = areaDelCirculo.toFixed(2);
}