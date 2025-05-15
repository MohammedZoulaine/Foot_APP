const mongoose = require("mongoose");

const terrainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: [String], 
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    images: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model("Terrain", terrainSchema);
