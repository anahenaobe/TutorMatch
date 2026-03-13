export function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`${inputId}-error`);

  if (input) input.classList.add("input-error");
  if (error) error.textContent = message;
}

export function clearFieldError(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`${inputId}-error`);

  if (input) input.classList.remove("input-error");
  if (error) error.textContent = "";
}

export function clearErrors(fieldIds) {
  fieldIds.forEach(clearFieldError);
}

export function renderEmptyState(container, title, description) {
  container.innerHTML = `
    <div class="tarjeta empty-state">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;
}