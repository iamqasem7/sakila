"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailable = exports.getFilms = void 0;
const db_1 = require("../database/db");
// Logica de getFilms
const getFilms = async (_req, res) => {
    try {
        //Lamamos a getDbPool para comprobar conexion
        const db = (0, db_1.getDbPool)();
        const [rows] = await db.query("SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film");
        res.json(rows);
    }
    catch (error) {
        console.error("Error al obtener films:", error);
        res.status(500).json({ message: "Error al obtener films", error });
    }
};
exports.getFilms = getFilms;
// Logica de get Available
const getAvailable = async (_req, res) => {
    //Lamamos a getDbPool para comprobar conexion
    const db = (0, db_1.getDbPool)();
    try {
        const [rows] = await db.query(`
      SELECT s.store_id, SUM(p.amount) AS ingresos_totales
      FROM store s
      JOIN staff st ON s.store_id = st.store_id
      JOIN payment p ON st.staff_id = p.staff_id
      GROUP BY s.store_id
    `);
        res.json(rows);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener ingresos de tiendas", error });
    }
};
exports.getAvailable = getAvailable;
