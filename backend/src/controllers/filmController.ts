import { Request, Response } from "express";
import { getDbPool } from "../database/db";

// Logica de getFilms
export const getFilms = async (_req: Request, res: Response) => {
  try {
    //Lamamos a getDbPool para comprobar conexion
    const db = getDbPool();
    const [rows] = await db.query(
      "SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener films:", error);
    res.status(500).json({ message: "Error al obtener films", error });
  }
};

// Logica de get Available
export const getAvailable = async (_req: Request, res: Response) => {
  //Lamamos a getDbPool para comprobar conexion
  const db = getDbPool();
  try {
    const [rows] = await db.query(`
      SELECT s.store_id, SUM(p.amount) AS ingresos_totales
      FROM store s
      JOIN staff st ON s.store_id = st.store_id
      JOIN payment p ON st.staff_id = p.staff_id
      GROUP BY s.store_id
    `);
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener ingresos de tiendas", error });
  }
};
