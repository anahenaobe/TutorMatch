export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "El correo es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El correo es inválido";
  }

  if (!password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener mínimo 6 caracteres";
  }

  return errors;
}

export function validateBooking({ date, time }) {
  const errors = {};

  if (!date) {
    errors.date = "La fecha es obligatoria";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  }

  return errors;
}
