// variables
let primerNumero;
let segundoNumero;
// arreglos
const primeros = [];
const segundos = [];

// Función para la inserción de los primeros 5 números
function ingresarPNumero() {
  // se asigna la variable obteniendo el numero del DOM
  primerNumero = parseInt(document.getElementById("primerosNumeros").value);

  // verificar que en el array hayan menos de 5 números
  if (primeros.length < 5) {
    document.getElementById("primerosNumeros").value = "";
    document.getElementById("primerosNumeros").focus();
  } else {
    alert("Ya ha ingresado 5 números.");
    return;
  }

  // verificar que si se haya ingresado un dato o valor valido
  if (isNaN(primerNumero) || primerNumero < 1) {
    alert("Por favor, ingrese un número válido para los primeros números.");
    return;
  }

  // verificar que el número ingresado sea mayor al anterior, comparándolo con el último valor del array
  if (primerNumero <= primeros[primeros.length - 1]) {
    alert("Por favor, ingrese un número mayor que el último ingresado.");
    return;
  }

  // inserta el numero al array
  primeros.push(primerNumero);

  // se llaman las respectivas funciones
  validarBotones();
  mostrarNumeros();
  ordenarNumeros();
}

// Función para la inserción de los otros 5 números, para un total de 10 números
function ingresarSNumero() {
  // se asigna la variable obteniendo el numero del DOM
  segundoNumero = parseInt(document.getElementById("segundosNumeros").value);

  // verificar que en el array hayan menos de 5 números
  if (segundos.length < 5) {
    document.getElementById("segundosNumeros").value = "";
    document.getElementById("segundosNumeros").focus();
  } else {
    alert("Ya ha ingresado 5 números.");
  }

  // verificar que si se haya ingresado un dato o valor valido
  if (isNaN(segundoNumero) || segundoNumero < 1) {
    alert("Por favor, ingrese un número válido para los segundos números.");
    return;
  }

  // verificar que el número ingresado sea mayor al anterior, comparándolo con el último valor del array
  if (segundoNumero <= segundos[segundos.length - 1]) {
    alert("Por favor, ingrese un número mayor que el último ingresado.");
    return;
  }

  // inserta el numero al array
  segundos.push(segundoNumero);

  // se llaman las respectivas funciones
  validarBotones();
  mostrarNumeros();
  ordenarNumeros();
}

// función para cambiar de estado los botones al llegar a la cantidad maxima
function validarBotones() {
  if (primeros.length === 5) {
    document.getElementById("primerosNumeros").disabled = true;
    document.getElementById("ingresarP").disabled = true;
  } else {
    document.getElementById("primerosNumeros").disabled = false;
    document.getElementById("ingresarP").disabled = false;
  }

  if (segundos.length === 5) {
    document.getElementById("segundosNumeros").disabled = true;
    document.getElementById("ingresarS").disabled = true;
  } else {
    document.getElementById("segundosNumeros").disabled = false;
    document.getElementById("ingresarS").disabled = false;
  }
}

// función para mostrar los números ingresados en el orden ingresado
function mostrarNumeros() {
  const combinados = [...primeros, ...segundos];
  document.getElementById("listaNumeros").innerText = combinados.join(", ");
}

// función para ordenar y mostrar los números de forma ascendente
function ordenarNumeros() {
  const combinados = [...primeros, ...segundos];
  combinados.sort((a, b) => a - b);
  document.getElementById("numerosOrdenados").innerText = combinados.join(", ");
}

// funcion para limpiar el array y las listas
function limpiarPNumeros() {
  primeros.length = 0;
  if (segundos.length === 0) {
    document.getElementById("listaNumeros").innerText = "";
    document.getElementById("numerosOrdenados").innerText = "";
  }
  validarBotones();
  mostrarNumeros();
  ordenarNumeros();
  document.getElementById("primerosNumeros").value = "";
  document.getElementById("primerosNumeros").focus();
}
// funcion para limpiar el array y las listas
function limpiarSNumeros() {
  segundos.length = 0;
  if (primeros.length === 0) {
    document.getElementById("listaNumeros").innerText = "";
    document.getElementById("numerosOrdenados").innerText = "";
  }
  validarBotones();
  mostrarNumeros();
  ordenarNumeros();
  document.getElementById("segundosNumeros").value = "";
  document.getElementById("segundosNumeros").focus();
}