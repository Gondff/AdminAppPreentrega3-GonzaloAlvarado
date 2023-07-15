
//Crear la clase estudiante

class Estudiante{
    constructor (nombre, apellido, dni,comision){
        this.nombre = nombre;
        this.apellido =apellido;
        this.dni = dni;
        this.comision = comision;
    }
}
//Funcion con Operador ternario
function generarComision(estudiante) {
    let numDni = parseInt(estudiante.dni);
    estudiante.comision = numDni % 2 === 0 ? 43125 : 43150;
  }

//crear el array donde se guardan

let curso = [];

// Funcion para agregar estudiante
function agregarEstudiante() {
    let nombre = document.getElementById("Nombre").value;
    let apellido = document.getElementById("Apellido").value;
    let dni = parseInt(document.getElementById("DNI").value);
  
    if (!nombre || !apellido || !dni) {
      alert("Debe ingresar todos los datos del estudiante");
    } else if (dniDuplicado(dni)){
        alert("ya existe un alumno con ese DNI")
    }else {
      const nuevoEstudiante = new Estudiante(nombre, apellido, dni);
      generarComision(nuevoEstudiante);
  
      curso.push(nuevoEstudiante);
      guardarEnLocalStorage();
      alert("Se agregó correctamente el estudiante");
  
      // Reiniciar los campos del formulario
      document.getElementById("Nombre").value = "";
      document.getElementById("Apellido").value = "";
      document.getElementById("DNI").value = "";
    }
  }

  //si no estan en esta posicion no funciona, preguntar por que?

  // Cargar datos desde el localStorage al array curso
function cargarDesdeLocalStorage() {
    const estudiantesGuardados = localStorage.getItem("curso");
    if (estudiantesGuardados) {
      curso = JSON.parse(estudiantesGuardados);
    }
  }
  
  // Guardar datos del array curso en el localStorage
  function guardarEnLocalStorage() {
    localStorage.setItem("curso", JSON.stringify(curso));
    alert("Estudiantes guardados en el LocalStorage");
  }


function dniDuplicado(dni){
    return curso.some((estudiante) => estudiante.dni === dni);
}


  function listarEstudiantes() {
    if (curso.length === 0) {
      alert("No hay estudiantes para mostrar");//me lo muestra si elimino el unico alumno, chequear
    } else {
      const contenedorEstudiantes = document.getElementById("estudiantesContainer");
      contenedorEstudiantes.innerHTML = "";
  
      curso.forEach((estudiante, index) => {
        // Crea una card por estudiante
        const tarjeta = document.createElement("div");
        tarjeta.className = "card text-bg-info mb-3";
        tarjeta.style = "max-width: 18rem;";
  
        const tarjetaHeader = document.createElement("div");
        tarjetaHeader.className = "card-header";
        tarjetaHeader.textContent = "Estudiante";
  
        const tarjetaBody = document.createElement("div");
        tarjetaBody.className = "card-body";
  
        const titulo = document.createElement("h5");
        titulo.className = "card-title";
        titulo.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
  
        const texto = document.createElement("p");
        texto.className = "card-text";
        texto.textContent = `DNI: ${estudiante.dni}, Comisión: ${estudiante.comision}`;
  
        // Boton eliminar en la card
        const botonEliminar = document.createElement('button');
        botonEliminar.className = "btn btn-danger";
        botonEliminar.textContent = "Eliminar";


        // Evento para eliminar
        botonEliminar.addEventListener("click", () => eliminarEstudiante(index));
  
        tarjetaBody.appendChild(titulo);
        tarjetaBody.appendChild(texto);
        tarjetaBody.appendChild(botonEliminar);// este es el boton eliminar, no confundir
        tarjeta.appendChild(tarjetaHeader);
        tarjeta.appendChild(tarjetaBody);
  
        // Agrega las tarjetas al contenedor
        contenedorEstudiantes.appendChild(tarjeta);
      });
    }
  }
  
  // Función para eliminar un estudiante del array curso
  function eliminarEstudiante(index) {
    curso.splice(index, 1);// Eliminar el estudiante del array en la posición index
    guardarEnLocalStorage();
    listarEstudiantes(); // Volver a mostrar la lista actualizada
  }
  
  //Funcion para buscar el alumno por DNI
  function buscarEstudiantePorDni() {
    let dniBuscado = parseInt(document.getElementById("buscarDNI").value);
    const estudianteEncontrado = curso.find((estudiante) => estudiante.dni === dniBuscado);
  
    if (estudianteEncontrado) {
      const contenedorEstudiantes = document.getElementById('estudiantesContainer');
      contenedorEstudiantes.innerHTML = "";
  
      const tarjeta = document.createElement("div");
      tarjeta.className = "card text-bg-info mb-3";
      tarjeta.style = "max-width: 18rem;";

      const tarjetaHeader = document.createElement("div");
      tarjetaHeader.className = "card-header";
      tarjetaHeader.textContent = "Estudiante";
  
      const tarjetaBody = document.createElement("div");
      tarjetaBody.className = "card-body";
  
      const titulo = document.createElement('h5');
      titulo.className = "card-title";
      titulo.textContent = `${estudianteEncontrado.nombre} ${estudianteEncontrado.apellido}`;
  
      const texto = document.createElement("p");
      texto.className = "card-text";
      texto.textContent = `DNI: ${estudianteEncontrado.dni}, Comisión: ${estudianteEncontrado.comision}`;
  
      tarjetaBody.appendChild(titulo);
      tarjetaBody.appendChild(texto);
      tarjeta.appendChild(tarjetaHeader);
      tarjeta.appendChild(tarjetaBody);
  
      contenedorEstudiantes.appendChild(tarjeta);
    } else {
      alert("DNI no encontrado");
    }
  }
  
  

function borrarLocalStorage() {
    localStorage.removeItem("curso");
    curso =[];//sin esto no se borra si las cards no estan visibles
    alert("Se ha borrado todo el contenido del LocalStorage");
  }
  



// Cargar datos del localStorage al array curso cuando inicia
cargarDesdeLocalStorage();
