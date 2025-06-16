"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const filmRoutes_1 = __importDefault(require("./routes/filmRoutes"));
const autentificacion_1 = require("./routes/autentificacion");
const app = (0, express_1.default)();
const publicPath = path_1.default.join(__dirname, '../../frontend/public');
const disPath = path_1.default.join(__dirname, '../../frontend/dist');
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas de autentificcion (login, connect, config)
app.use('/', autentificacion_1.authRouter);
// Proteccion de root e index antes de servir los archivos estaticos 
app.get(['/', '/index.html'], (_req, res, next) => {
    if (!autentificacion_1.dbConfig) {
        return res.redirect('/login.html');
    }
    next();
});
// Servimos archivos estaticos
app.use(express_1.default.static(publicPath));
app.use('/dist', express_1.default.static(disPath));
// API protegida: FILMS
app.use('/api/films', 
// middleware de auth
(req, res, next) => {
    if (!autentificacion_1.dbConfig) {
        res.status(403).json({ message: 'Autenticar conexion primero' });
        return; //  ¡aquí salimos sin devolver el Response!
    }
    next(); //  continuamos hacia filmRoutes
}, filmRoutes_1.default);
exports.default = app;
