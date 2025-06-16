"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailable = exports.getFilms = void 0;
const db_1 = require("../database/db");
// Logica de getFilms
const getFilms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Lamamos a getDbPool para comprobar conexion
        const db = (0, db_1.getDbPool)();
        const [rows] = yield db.query('SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film LIMIT 20');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener films:', error);
        res.status(500).json({ message: 'Error al obtener films', error });
    }
});
exports.getFilms = getFilms;
// Logica de get Available
const getAvailable = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Lamamos a getDbPool para comprobar conexion
    const db = (0, db_1.getDbPool)();
    try {
        const [rows] = yield db.query(`
      SELECT s.store_id, SUM(p.amount) AS ingresos_totales
      FROM store s
      JOIN staff st ON s.store_id = st.store_id
      JOIN payment p ON st.staff_id = p.staff_id
      GROUP BY s.store_id
    `);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener ingresos de tiendas', error });
    }
});
exports.getAvailable = getAvailable;
