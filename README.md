# Tutor.match 📚

Marketplace de tutorías entre pares para estudiantes universitarios.  
Proyecto — Entrega 1 | Ana Henao · Samuel Acosta

---

## ¿Qué es? 

TutorMatch conecta estudiantes con tutores en materias como matemáticas, programación y física. Los estudiantes pueden buscar tutores, filtrar por precio y modalidad, y reservar sesiones. Los tutores publican su disponibilidad y gestionan sus reservas.

---

## Cómo correr el proyecto 🧐

No necesita instalación ni servidor, Solo abriendo el  `index.html` en el navegador.
Si usas VS Code, instala la extensión **Live Server**, haz clic derecho sobre `index.html` y selecciona *Open with Live Server*.

---

## Flujo principal

1. El usuario se registra como **estudiante** o **tutor** en `/pages/registrarse.html`
2. Busca tutores por materia, precio o modalidad en `/pages/search.html`
3. Entra al perfil de un tutor en `/pages/tutor.html`
4. Solicita una sesión con fecha y hora en `/pages/booking-request.html`
5. Consulta y cancela sus reservas en `/pages/my-bookings.html`

---

## Persistencia

La sesión y las reservas se guardan en `localStorage` del navegador. No hay backend — los datos mock están en `js/mockData.js`.


- HTML5 · CSS3 · JavaScript vanilla (ES Modules)
- Google Fonts: Major Mono Display, Noto Serif Display, Nunito
- Sin frameworks ni dependencias externas
