const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    adresse: {
        type: String,
        required: false,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    position: {
        type: String,
        enum: ['Gardien', 'Défenseur', 'Milieu', 'Attaquant'],
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
