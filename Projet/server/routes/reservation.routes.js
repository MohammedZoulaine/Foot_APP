const express = require("express");
const { 
    createReservation, 
    getAllReservations, 
    getReservationById, 
    updateReservation, 
    deleteReservation 
} = require("../controllers/reservation.controller.js");

const router = express.Router();

router.post("/", createReservation);

router.get("/", getAllReservations);

router.get("/:reservationId", getReservationById);

router.put("/:reservationId", updateReservation);

router.delete("/:reservationId", deleteReservation);

module.exports = router;
