const Reservation = require("../models/reservation.js");

const createReservation = async (req, res) => {
    const { user, terrain, date, hour } = req.body;
    try {
        const reservation = new Reservation({ user, terrain, date, hour });
        await reservation.save();
        res.status(201).json({ message: "Réservation créée avec succès.", reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', 'name email')
            .populate('terrain', 'name location');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReservationById = async (req, res) => {
    const { reservationId } = req.params;
    try {
        const reservation = await Reservation.findById(reservationId)
            .populate('user', 'name email')
            .populate('terrain', 'name location');
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReservation = async (req, res) => {
    const { reservationId } = req.params;
    const { date, hour, status } = req.body;
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { date, hour, status },
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }
        res.status(200).json({ message: "Réservation mise à jour avec succès.", updatedReservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReservation = async (req, res) => {
    const { reservationId } = req.params;
    try {
        const reservation = await Reservation.findByIdAndDelete(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }
        res.status(200).json({ message: "Réservation supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
};
