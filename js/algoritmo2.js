// ----------------- Algoritmo 1 -----------------
// Llamadas al DOM
const edad = parseInt(document.getElementById("edad").value);
// Arreglo
const edades = [];

// Función para la inserción de las edades con las que se realizarán las métricas
function ingresarEdad() {const edad = parseInt(document.getElementById("edad").value);
  if (isNaN(edad) || edad < 1 || edad > 120) {
    alert("Por favor, ingrese una edad válida entre 1 y 120.");
    return;
  }

  // validar que no se agreguen mas de 10 edades
  if (edades.length < 10) {
    edades.push(edad);
    document.getElementById("edad").value = "";
    document.getElementById("edad").focus();
  } else {
    alert("Ya se han ingresado las 10 edades.");
  }

  // cuando llega a 10 hace las llamadas a las respectivas funciones
  if (edades.length === 10) {
    const cantidadMenores = contarMenores(edades);
    const cantidadMayores = contarMayores(edades);
    const cantidadAdultosMayores = contarAdultosMayores(edades);
    const edadMinima = Math.min(...edades);
    const edadMaxima = Math.max(...edades);
    const promedio = calcularPromedio(edades);

    document.getElementById("cantidadMenores").innerText = cantidadMenores;
    document.getElementById("cantidadMayores").innerText = cantidadMayores;
    document.getElementById("cantidadAdultosMayores").innerText = cantidadAdultosMayores;
    document.getElementById("edadMinima").innerText = edadMinima;
    document.getElementById("edadMaxima").innerText = edadMaxima;
    document.getElementById("promedioEdades").innerText = promedio;
  }

  // actualiza la lista de edades
  actualizarListaEdades();
}

// Función para determinar el numero de menores de edad
function contarMenores(edades) {
  let contador = 0;
  for (let edad of edades) {
    if (edad < 18) {
      contador++;
    }
  }
  return contador;
}

// Función para determinar el numero de mayores de edad
function contarMayores(edades) {
  let contador = 0;
  for (let edad of edades) {
    if (edad >= 18 && edad < 60) {
      contador++;
    }
  }
  return contador;
}

// Función para determinar la cantidad de adultos mayores
function contarAdultosMayores(edades) {
  let contador = 0; 
  for (let edad of edades) {
    if (edad >= 60) {
      contador++;
    }
  }
  return contador;
}

// Función para calcular el promedio de edades
function calcularPromedio(edades) {
  let suma = 0;

  for (let edad of edades) {
    suma += edad;
  }

  let promedio = suma / edades.length;
  return Math.round(promedio);
}

// Función para actualizar la lista de edades
function actualizarListaEdades() {
  const listaEdades = document.getElementById("listaEdades");
  listaEdades.innerHTML = "<h3>Edades ingresadas:</h3><ul>" + edades.map(edad => `<li>${edad}</li>`).join("") + "</ul>";
}

// Función para limpiar/eliminar las edades ingresadas
function limpiarEdades() {
  edades.length = 0;
  document.getElementById("cantidadMenores").innerText = "";
  document.getElementById("cantidadMayores").innerText = "";
  document.getElementById("cantidadAdultosMayores").innerText = "";
  document.getElementById("edadMinima").innerText = "";
  document.getElementById("edadMaxima").innerText = "";
  document.getElementById("promedioEdades").innerText = "";
  actualizarListaEdades();
}