import { open } from 'sqlite'; // Función para abrir la base de datos
import sqlite3 from 'sqlite3'; // Controlador de SQLite

// Ruta del archivo de la base de datos (ajusta esto según tu estructura de carpetas)
const dbpath = './db/task_manager.db'; // Ruta a tu archivo .db

// Creación y apertura de la base de datos
export async function openDB() {
  const db = await open({
    filename: dbpath,
    driver: sqlite3.Database,
  });
  return db;
}
