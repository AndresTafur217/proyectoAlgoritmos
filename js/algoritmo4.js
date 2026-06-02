// arreglos principales
const personas = [];
const canciones = [];

// llamadas al DOM
const agregarPersonaBtn = document.getElementById("agregarPersonaBtn");
const agregarCancionBtn = document.getElementById("agregarCancionBtn");
const personaBtn       = document.getElementById("personaBtn");
const cancionBtn       = document.getElementById("cancionBtn");

const headPersona      = document.getElementById("head"); // título dinámico del form
const datosPersona     = document.getElementById("datosPersona"); // form persona
const datosCancion     = document.getElementById("datosCancion"); // form canción
const listaCanciones   = document.getElementById("listaCanciones"); // lista de canciones
const listaPersonas    = document.querySelector(".listaPersonas"); // tbody de la tabla

// función para listar personas
function listarPersonas() {
  listaPersonas.innerHTML = "";

  // Si no hay personas mostrar una fila de aviso
  if (personas.length === 0) {
    listaPersonas.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;color:#aaa;padding:20px;font-style:italic;">
          No hay personas registradas.
        </td>
      </tr>`;
    return;
  }

  personas.forEach((persona, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${persona.nombre}</td>
      <td>${persona.correo}</td>
      <td>${persona.ciudadOrigen}</td>
      <td>${persona.ciudadResidencia}</td>
      <td>
        <div class="tablaAcciones">
          <button class="btn btnEditar"
                  onclick="editarPersona(${index})">Editar</button>
          <button class="btn btnEliminar"
                  onclick="eliminarPersona(${index})">Eliminar</button>
          <button class="btn btnMostrar"
                  onclick="mostrarPersona(${index})">Mostrar</button>
        </div>
      </td>
    `;
    listaPersonas.appendChild(tr);
  });
}

function limpiarFormularioPersona() {
  document.getElementById("nombre").value = "";
  document.getElementById("cedula").value = "";
  document.getElementById("fechaNacimiento").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("ciudadOrigen").value = "";
  document.getElementById("ciudadResidencia").value = "";
  canciones.length = 0;
  listaCanciones.innerHTML = "";
  mostrarFormCancion(false);
  actualizarEstadoBotonCancion();
}

// validar que la cédula ingresada no haya sido ingresada anteriormente
function cedulaExiste(cedula, excluirIndex = null) {
  return personas.some((p, i) =>
    i !== excluirIndex && p.cedula.trim() === cedula.trim()
  );
}

// validar que el correo ingresado no haya sido ingresado anteriormente
function correoExiste(correo, excluirIndex = null) {
  return personas.some((p, i) =>
    i !== excluirIndex && p.correo.trim().toLowerCase() === correo.trim().toLowerCase()
  );
}

// función para el formulario de agregar persona
function agregarPersona() {
  // Límite de 6 personas
  if (personas.length >= 6) {
    alert("Se ha alcanzado el límite de 6 personas.");
    return;
  }

  // Limpiar formulario antes de mostrar
  limpiarFormularioPersona();

  // Quitar modo solo lectura por si venía de mostrarPersona
  datosPersona.classList.remove("readonly");

  // Habilitar inputs
  habilitarInputsPersona(true);

  // Título del formulario
  headPersona.textContent = "Agregar nueva persona";

  // Mostrar formulario completo
  datosPersona.classList.add("show");

  // Mostrar botón principal y configurarlo para INSERTAR
  personaBtn.classList.add("show");
  personaBtn.textContent = "Insertar";
  personaBtn.onclick = insertarPersona;

  // Mostrar botón agregar canción
  agregarCancionBtn.disabled = false;
}

// función para insertar persona al array de objetos personas
function insertarPersona() {
  const nombre = document.getElementById("nombre").value.trim();
  const cedula = document.getElementById("cedula").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const correo = document.getElementById("correo").value.trim();
  const ciudadOrigen = document.getElementById("ciudadOrigen").value.trim();
  const ciudadResidencia = document.getElementById("ciudadResidencia").value.trim();

  // Validar que todos los campos estén llenos
  if (!nombre || !cedula || !fechaNacimiento || !correo || !ciudadOrigen || !ciudadResidencia) {
    alert("Por favor complete todos los campos de la persona.");
    return;
  }

  // Validar cédula única
  if (cedulaExiste(cedula)) {
    alert(`Ya existe una persona con la cédula "${cedula}".`);
    return;
  }

  // Validar correo único
  if (correoExiste(correo)) {
    alert(`Ya existe una persona con el correo "${correo}".`);
    return;
  }

  // Construir objeto persona con copia de las canciones temporales
  const nuevaPersona = {
    nombre,
    cedula,
    fechaNacimiento,
    correo,
    ciudadOrigen,
    ciudadResidencia,
    canciones: canciones.slice() // copia del arreglo temporal
  };

  // insertar objeto al array
  personas.push(nuevaPersona);

  // Actualizar tabla
  listarPersonas();

  // Ocultar y limpiar formulario
  datosPersona.classList.remove("show");
  limpiarFormularioPersona();
}

// funcion para editar persona
function editarPersona(index) {
  const persona = personas[index];

  // Cargar canciones de la persona en el arreglo temporal
  canciones.length = 0;
  persona.canciones.forEach(c => canciones.push({ ...c }));

  // Quitar modo solo lectura
  datosPersona.classList.remove("readonly");
  habilitarInputsPersona(true);

  // Rellenar campos
  document.getElementById("nombre").value = persona.nombre;
  document.getElementById("cedula").value = persona.cedula;
  document.getElementById("fechaNacimiento").value = persona.fechaNacimiento;
  document.getElementById("correo").value = persona.correo;
  document.getElementById("ciudadOrigen").value = persona.ciudadOrigen;
  document.getElementById("ciudadResidencia").value = persona.ciudadResidencia;

  // Mostrar formulario
  headPersona.textContent = `Editando: ${persona.nombre}`;
  datosPersona.classList.add("show");

  // Refrescar lista de canciones (usando el arreglo temporal)
  listarCanciones();
  actualizarEstadoBotonCancion();

  // Configurar botón principal para ACTUALIZAR
  personaBtn.classList.add("show");
  personaBtn.textContent = "Actualizar";
  personaBtn.onclick = function () {
    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const correo = document.getElementById("correo").value.trim();
    const ciudadOrigen = document.getElementById("ciudadOrigen").value.trim();
    const ciudadResidencia = document.getElementById("ciudadResidencia").value.trim();

    // Validar campos
    if (!nombre || !cedula || !fechaNacimiento || !correo || !ciudadOrigen || !ciudadResidencia) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Validar duplicados excluyendo la persona actual
    if (cedulaExiste(cedula, index)) {
      alert(`Ya existe otra persona con la cédula "${cedula}".`);
      return;
    }
    if (correoExiste(correo, index)) {
      alert(`Ya existe otra persona con el correo "${correo}".`);
      return;
    }

    // Actualizar registro
    personas[index] = {
      nombre,
      cedula,
      fechaNacimiento,
      correo,
      ciudadOrigen,
      ciudadResidencia,
      canciones: canciones.slice()
    };

    listarPersonas();
    datosPersona.classList.remove("show");
    limpiarFormularioPersona();
  };
}

// funcion para mostrar los datos de una persona
function mostrarPersona(index) {
  const persona = personas[index];

  // Poner modo solo lectura
  datosPersona.classList.add("readonly");
  habilitarInputsPersona(false);

  // Rellenar campos
  document.getElementById("nombre").value = persona.nombre;
  document.getElementById("cedula").value = persona.cedula;
  document.getElementById("fechaNacimiento").value = persona.fechaNacimiento;
  document.getElementById("correo").value = persona.correo;
  document.getElementById("ciudadOrigen").value = persona.ciudadOrigen;
  document.getElementById("ciudadResidencia").value = persona.ciudadResidencia;

  // Título del formulario
  headPersona.textContent = `Datos de: ${persona.nombre}`;

  // Mostrar el formulario
  datosPersona.classList.add("show");

  // Ocultar controles de edición
  personaBtn.classList.remove("show");
  agregarCancionBtn.style.display = "none"; // ocultar en modo lectura
  mostrarFormCancion(false);

  // Mostrar las canciones de la persona (sin botones de acción)
  listaCanciones.innerHTML = "";
  persona.canciones.forEach(cancion => {
    const div = document.createElement("div");
    div.className = "cancionItem";
    div.innerHTML = `
      <span>🎵 ${cancion.titulo} — ${cancion.artista}</span>
    `;
    listaCanciones.appendChild(div);
  });

  // Si no tiene canciones
  if (persona.canciones.length === 0) {
    listaCanciones.innerHTML = `<p style="font-size:0.85rem;color:#888;">Sin canciones registradas.</p>`;
  }
}

// funcion para eliminar persona
function eliminarPersona(index) {
  if (confirm(`¿Seguro que deseas eliminar a "${personas[index].nombre}"?`)) {
    personas.splice(index, 1);
    listarPersonas();
  }
}

// función para listar canciónes
function listarCanciones() {
  listaCanciones.innerHTML = "";

  canciones.forEach((cancion, index) => {
    const div = document.createElement("div");
    div.className = "cancionItem";
    div.innerHTML = `
      <span>🎵 ${cancion.titulo} — ${cancion.artista}</span>
      <div class="cancionAcciones">
        <button class="btn btnsm btnEditar"
                onclick="editarCancion(${index})">Editar</button>
        <button class="btn btnsm btnEliminar"
                onclick="eliminarCancion(${index})">Eliminar</button>
      </div>
    `;
    listaCanciones.appendChild(div);
  });
}

// Funcion para mostrar el formulario de canción
function mostrarFormCancion(visible) {
  if (visible) {
    datosCancion.classList.add("show");
  } else {
    datosCancion.classList.remove("show");
    // Limpiar campos al cerrar
    document.getElementById("titulo").value  = "";
    document.getElementById("artista").value = "";
  }
}

function actualizarEstadoBotonCancion() {
  if (canciones.length >= 3) {
    agregarCancionBtn.disabled = true;
    // Cerrar el formulario de canción si estaba abierto
    mostrarFormCancion(false);
  } else {
    agregarCancionBtn.disabled = false;
  }
}

// función para el formulacion de agragar canción
function agregarCancion() {
  // Doble chequeo por seguridad (el botón ya debería estar deshabilitado)
  if (canciones.length >= 3) {
    actualizarEstadoBotonCancion();
    return;
  }

  // Mostrar formulario de canción
  mostrarFormCancion(true);

  // Configurar botón para INSERTAR canción
  cancionBtn.textContent = "Insertar";
  cancionBtn.onclick = insertarCancion;
}

// función para insertar la canción al array temporal
function insertarCancion() {
  const titulo  = document.getElementById("titulo").value.trim();
  const artista = document.getElementById("artista").value.trim();

  // validar que los datos hayan sido ingresados
  if (!titulo || !artista) {
    alert("Por favor ingrese el título y el artista de la canción.");
    return;
  }

  // Agregar la canción al arreglo temporal
  canciones.push({ titulo, artista });

  // Cerrar formulario de canción
  mostrarFormCancion(false);

  // Refrescar la lista y actualizar el estado del botón
  listarCanciones();
  actualizarEstadoBotonCancion();
}

// función para editar canción
function editarCancion(cancionIndex) {
  const cancion = canciones[cancionIndex];

  // Mostrar formulario con los datos actuales
  mostrarFormCancion(true);
  document.getElementById("titulo").value  = cancion.titulo;
  document.getElementById("artista").value = cancion.artista;

  // Configurar botón para ACTUALIZAR canción
  cancionBtn.textContent = "Actualizar";
  cancionBtn.onclick = function () {
    const titulo  = document.getElementById("titulo").value.trim();
    const artista = document.getElementById("artista").value.trim();

    if (!titulo || !artista) {
      alert("Por favor ingrese el título y el artista.");
      return;
    }

    // Actualizar en el arreglo temporal
    canciones[cancionIndex] = { titulo, artista };

    // Cerrar formulario y refrescar lista
    mostrarFormCancion(false);
    listarCanciones();
    actualizarEstadoBotonCancion();
  };
}

// función para eliminar canción
function eliminarCancion(cancionIndex) {
  if (confirm("¿Seguro que deseas eliminar esta canción?")) {
    canciones.splice(cancionIndex, 1);
    listarCanciones();
    // Al eliminar se puede volver a agregar
    actualizarEstadoBotonCancion();
  }
}

// función para el sorteo
function sortear() {
  if (personas.length === 0) {
    alert("No hay personas registradas para el sorteo.");
    return;
  }

  // Elegir índice aleatorio
  const indiceAleatorio = Math.floor(Math.random() * personas.length);
  const ganador         = personas[indiceAleatorio];

  // Descripción opcional: si está vacía se omite del mensaje
  const descripcionRaw  = document.getElementById("descripcionSorteo").value.trim();
  const descripcion     = descripcionRaw ? `Sorteo: "${descripcionRaw}"\n` : "";

  alert(
    `🎉 ¡Tenemos un ganador!\n\n` +
    `${descripcion}` +
    `Nombre:  ${ganador.nombre}\n` +
    `Cédula:  ${ganador.cedula}\n` +
    `Correo:  ${ganador.correo}`
  );

  // Mostrar los datos del ganador en el formulario (modo lectura)
  mostrarPersona(indiceAleatorio);
}

// funcion para habilitar o deshabilitar inputs
function habilitarInputsPersona(habilitado) {
  const ids = ["nombre", "cedula", "fechaNacimiento", "correo", "ciudadOrigen", "ciudadResidencia"];
  ids.forEach(id => {
    document.getElementById(id).disabled = !habilitado;
  });

  // En modo lectura también ocultamos el botón de agregar canción
  if (!habilitado) {
    agregarCancionBtn.style.display = "none";
  } else {
    agregarCancionBtn.style.display = "";
  }
}