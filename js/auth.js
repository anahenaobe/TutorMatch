import { usersMock } from "./mockData.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage
} from "./storage.js";

const SESSION_KEY = "session";
const REGISTERED_USERS_KEY = "registeredUsers";

export function getSession() {
  return loadFromLocalStorage(SESSION_KEY, null);
}

export function getAllUsers() {
  const registeredUsers = loadFromLocalStorage(REGISTERED_USERS_KEY, []);
  return [...usersMock, ...registeredUsers];
}

export function login(email, password) {
  const users = getAllUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, message: "Correo o contraseña incorrectos" };
  }

  const session = {
    id: user.id,
    name: user.name || user.nombre,
    email: user.email,
    role: user.role,
    isAuthenticated: true
  };

  saveToLocalStorage(SESSION_KEY, session);

  return { success: true, user: session };
}

export function logout() {
  removeFromLocalStorage(SESSION_KEY);
}