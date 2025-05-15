const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes.js");
const terrainRoutes = require("./routes/terrain.routes.js");
const equipeRoutes = require("./routes/equipe.routes.js");
const reservationRoutes = require("./routes/reservation.routes.js");
const commentRoutes = require('./routes/comment.routes');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/terrains", terrainRoutes);
app.use("/api/equipes", equipeRoutes);
app.use("/api/reservations", reservationRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;
