const mongoose = require("mongoose");

const equipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    logo: {
        type: String, // URL de l'image du logo
        required: false, // Facultatif (ajoute `required: true` si obligatoire)
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
equipeSchema.pre('save', function (next) {
    if (this.players.length > 10) {
        return next(new Error("Une équipe ne peut pas avoir plus de 10 joueurs."));
    }
    next();
});

module.exports = mongoose.model("Equipe", equipeSchema);
