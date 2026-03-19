import { usersMock } from "./mockData.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage
} from "./storage.js";

const SESSION_KEY = "session";
const REGISTERED_USERS_KEY = "registeredUsers";

export function getSession() {
  const session = localStorage.getItem("session");
  return session ? JSON.parse(session) : null;
}

export function getAllUsers() {
  const registeredUsers = loadFromLocalStorage(REGISTERED_USERS_KEY, []);
  return [...usersMock, ...registeredUsers];
}

export async function login(email, password) {
  // Simulación de usuarios (puede venir de API)
  const users = getAllUsers();


  // Buscar usuario
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Correo o contraseña incorrectos"
    };
  }

  localStorage.setItem("session", JSON.stringify(user));

  return {
    success: true,
    user
  };
}

export function logout() {
  localStorage.removeItem("session");
}