import { tutorsMock } from "./mockData.js";
import { renderEmptyState } from "./ui.js";

const inputBusqueda = document.getElementById("inputBusqueda");
const selectModalidad = document.getElementById("selectModalidad");
const selectPrecio = document.getElementById("selectPrecio");
const selectCalificacion = document.getElementById("selectCalificacion");
const filaMaterias = document.getElementById("filaMaterias");
const filtroDisponibilidad = document.getElementById("filtroDisponibilidad");
const filtroOrden = document.getElementById("filtroOrden");
const botonLimpiar = document.getElementById("botonLimpiar");
const numeroResultados = document.getElementById("numeroResultados");
const grillaTutores = document.getElementById("grillaTutores");

let materiaSeleccionada = "";

function formatPrice(price) {
  return `$${price.toLocaleString("es-CO")}`;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function cumpleFiltroPrecio(price, filtro) {
  if (!filtro) return true;
  if (filtro === "bajo") return price <= 30000;
  if (filtro === "medio") return price > 30000 && price <= 60000;
  if (filtro === "alto") return price > 60000;
  return true;
}

function cumpleFiltroDisponibilidad(tutor, filtro) {
  if (!filtro) return true;
  if (filtro === "hoy") return tutor.availableToday === true;
  if (filtro === "semana") return true;
  return true;
}

function ordenarTutores(tutores, orden) {
  const copia = [...tutores];

  if (orden === "precio-asc") {
    return copia.sort((a, b) => a.pricePerHour - b.pricePerHour);
  }

  if (orden === "precio-desc") {
    return copia.sort((a, b) => b.pricePerHour - a.pricePerHour);
  }

  if (orden === "resenas") {
    return copia.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  return copia.sort((a, b) => b.rating - a.rating);
}

function renderTutors(tutors) {
  numeroResultados.textContent = tutors.length;

  if (!tutors.length) {
    renderEmptyState(
      grillaTutores,
      "No encontramos tutores",
      "Prueba cambiando los filtros o escribiendo otra búsqueda."
    );
    return;
  }

  grillaTutores.innerHTML = tutors
    .map(
      (tutor) => `
        <div class="tarjeta">
          <div class="encabezado-tarjeta">
            <div class="iniciales-tutor iniciales-grandes">
              ${getInitials(tutor.name)}
            </div>
            <div>
              <div class="nombre-tutor">${tutor.name}</div>
              <div class="materia-tutor">Tutor/a de ${tutor.subject}</div>
            </div>
          </div>

          <div class="fila-calificacion" style="margin-bottom: 1rem;">
            <span class="estrellas">
              <span class="estrella-llena">★</span>
              <span class="estrella-llena">★</span>
              <span class="estrella-llena">★</span>
              <span class="estrella-llena">★</span>
              <span class="estrella-llena">★</span>
            </span>
            <span class="numero-calificacion">${tutor.rating}</span>
            <span class="cantidad-resenas">(${tutor.reviewsCount} reseñas)</span>
          </div>

          ${
            tutor.availableToday
              ? `<div class="pastilla-disponible">
                  <div class="punto-verde"></div>
                  Disponible hoy
                </div>`
              : ""
          }

          <div class="grupo-etiquetas" style="margin: 1rem 0;">
            ${tutor.subjects
              .map(
                (subject) =>
                  `<span class="etiqueta etiqueta-morada">${subject}</span>`
              )
              .join("")}
            <span class="etiqueta etiqueta-verde">${tutor.modality}</span>
          </div>

          <div class="fila-precio-boton">
            <div class="precio-tarjeta">
              ${formatPrice(tutor.pricePerHour)}
              <span class="unidad-precio">/ hora</span>
            </div>

            <a href="tutor.html?id=${tutor.id}" class="boton boton-morado boton-chico">
            Ver perfil
            </a>
          </div>
        </div>
      `
    )
    .join("");
}

function filtrarTutores() {
  const texto = inputBusqueda.value.toLowerCase().trim();
  const modalidad = selectModalidad.value.toLowerCase();
  const precio = selectPrecio.value;
  const calificacion = parseFloat(selectCalificacion.value) || 0;
  const disponibilidad = filtroDisponibilidad.value;
  const orden = filtroOrden.value;

  let tutoresFiltrados = tutorsMock.filter((tutor) => {
    const coincideTexto =
      tutor.name.toLowerCase().includes(texto) ||
      tutor.subject.toLowerCase().includes(texto) ||
      tutor.subjects.some((subject) =>
        subject.toLowerCase().includes(texto)
      );

    const coincideModalidad =
      !modalidad || tutor.modality.toLowerCase() === modalidad;

    const coincidePrecio = cumpleFiltroPrecio(tutor.pricePerHour, precio);

    const coincideCalificacion = tutor.rating >= calificacion;

    const coincideMateria =
      !materiaSeleccionada ||
      tutor.subject.toLowerCase() === materiaSeleccionada.toLowerCase() ||
      tutor.subjects.some(
        (subject) => subject.toLowerCase() === materiaSeleccionada.toLowerCase()
      );

    const coincideDisponibilidad = cumpleFiltroDisponibilidad(
      tutor,
      disponibilidad
    );

    return (
      coincideTexto &&
      coincideModalidad &&
      coincidePrecio &&
      coincideCalificacion &&
      coincideMateria &&
      coincideDisponibilidad
    );
  });

  tutoresFiltrados = ordenarTutores(tutoresFiltrados, orden);
  renderTutors(tutoresFiltrados);
}

inputBusqueda.addEventListener("input", filtrarTutores);
selectModalidad.addEventListener("change", filtrarTutores);
selectPrecio.addEventListener("change", filtrarTutores);
selectCalificacion.addEventListener("change", filtrarTutores);
filtroDisponibilidad.addEventListener("change", filtrarTutores);
filtroOrden.addEventListener("change", filtrarTutores);

filaMaterias.addEventListener("click", (event) => {
  if (event.target.matches("[data-materia]")) {
    document.querySelectorAll(".etiqueta-materia").forEach((button) => {
      button.classList.remove("activa");
    });

    event.target.classList.add("activa");
    materiaSeleccionada = event.target.dataset.materia;
    filtrarTutores();
  }
});

botonLimpiar.addEventListener("click", () => {
  inputBusqueda.value = "";
  selectModalidad.value = "";
  selectPrecio.value = "";
  selectCalificacion.value = "";
  filtroDisponibilidad.value = "";
  filtroOrden.value = "calificacion";
  materiaSeleccionada = "";

  document.querySelectorAll(".etiqueta-materia").forEach((button) => {
    button.classList.remove("activa");
  });

  const botonTodas = document.querySelector('[data-materia=""]');
  if (botonTodas) botonTodas.classList.add("activa");

  filtrarTutores();
});

filtrarTutores();