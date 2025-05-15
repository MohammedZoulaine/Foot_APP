const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    terrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Terrain',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
