import { tutorsMock } from "./mockData.js";
import { renderEmptyState } from "./ui.js";

const tutorDetailContainer = document.getElementById("tutorDetailContainer");

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

function getTutorIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderTutorDetail(tutor) {
  tutorDetailContainer.innerHTML = `
    <section class="detalle-tutor-layout">
      <div class="tarjeta detalle-tutor-principal">
        <div class="encabezado-tarjeta" style="margin-bottom: 1.5rem;">
          <div class="iniciales-tutor iniciales-grandes">
            ${getInitials(tutor.name)}
          </div>
          <div>
            <h1 class="nombre-tutor" style="font-size: 2rem;">${tutor.name}</h1>
            <p class="materia-tutor">Tutor/a de ${tutor.subject}</p>
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
            ? `<div class="pastilla-disponible" style="margin-bottom: 1rem;">
                <div class="punto-verde"></div>
                Disponible hoy
              </div>`
            : ""
        }

        <p class="descripcion-tutor">
          Tutor comprometido con el aprendizaje personalizado, enfocado en explicar conceptos de forma clara y acompañar al estudiante en su proceso académico.
        </p>

        <div class="grupo-etiquetas" style="margin-top: 1.2rem;">
          ${tutor.subjects
            .map(
              (subject) => `<span class="etiqueta etiqueta-morada">${subject}</span>`
            )
            .join("")}
          <span class="etiqueta etiqueta-verde">${tutor.modality}</span>
        </div>
      </div>

      <aside class="tarjeta detalle-tutor-resumen">
        <h2 class="titulo-panel-tutor">Resumen</h2>

        <div class="item-resumen-tutor">
          <span class="label-resumen">Materia principal</span>
          <span class="valor-resumen">${tutor.subject}</span>
        </div>

        <div class="item-resumen-tutor">
          <span class="label-resumen">Modalidad</span>
          <span class="valor-resumen">${tutor.modality}</span>
        </div>

        <div class="item-resumen-tutor">
          <span class="label-resumen">Calificación</span>
          <span class="valor-resumen">${tutor.rating}</span>
        </div>

        <div class="item-resumen-tutor">
          <span class="label-resumen">Precio</span>
          <span class="valor-resumen">${formatPrice(tutor.pricePerHour)} / hora</span>
        </div>

        <a href="booking-request.html" class="boton boton-morado boton-grande boton-ancho" style="margin-top: 1rem;">
          Reservar tutoría
        </a>

        <a href="search.html" class="boton boton-borde boton-grande boton-ancho" style="margin-top: 0.75rem;">
          Volver a resultados
        </a>
      </aside>
    </section>
  `;
}

function initTutorPage() {
  const tutorId = getTutorIdFromUrl();

  if (!tutorId) {
    renderEmptyState(
      tutorDetailContainer,
      "Tutor no encontrado",
      "No se recibió un identificador de tutor en la URL."
    );
    return;
  }

  const tutor = tutorsMock.find((item) => item.id === tutorId);

  if (!tutor) {
    renderEmptyState(
      tutorDetailContainer,
      "Tutor no encontrado",
      "No existe un tutor con ese identificador."
    );
    return;
  }

  renderTutorDetail(tutor);
}

initTutorPage();