export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
}

export function loadFromLocalStorage(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return fallback;
  }
}

export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error eliminando ${key}:`, error);
  }
}