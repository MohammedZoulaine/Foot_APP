const Equipe = require("../models/equipe.js");
const User = require("../models/User.js");

const createEquipe = async (req, res) => {
    const { name, owner, players, logo } = req.body;
    try {
        const equipe = new Equipe({ name, owner, players, logo });
        await equipe.save();
        res.status(201).json({ message: "Équipe créée avec succès.", equipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addPlayerToEquipe = async (req, res) => {
    const { equipeId } = req.params;
    const { playerId } = req.body;
    try {
        const equipe = await Equipe.findById(equipeId);
        if (!equipe) {
            return res.status(404).json({ message: "Équipe non trouvée." });
        }

        if (equipe.players.includes(playerId)) {
            return res.status(400).json({ message: "Ce joueur est déjà dans l'équipe." });
        }

        if (equipe.players.length >= 10) {
            return res.status(400).json({ message: "L'équipe est complète (10 joueurs max)." });
        }

        equipe.players.push(playerId);
        await equipe.save();

        res.status(200).json({ message: "Joueur ajouté avec succès.", equipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllEquipes = async (req, res) => {
    try {
        const equipes = await Equipe.find()
            .populate('players', 'name email')
            .populate('owner', 'name email');
        res.status(200).json(equipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEquipeById = async (req, res) => {
    const { equipeId } = req.params;
    try {
        const equipe = await Equipe.findById(equipeId)
            .populate('players', 'name email')
            .populate('owner', 'name email');
        if (!equipe) {
            return res.status(404).json({ message: "Équipe non trouvée." });
        }
        res.status(200).json(equipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEquipe = async (req, res) => {
    const { equipeId } = req.params;
    const { name, players, logo } = req.body;
    try {
        if (players && players.length > 10) {
            return res.status(400).json({ message: "Une équipe ne peut pas avoir plus de 10 joueurs." });
        }

        const updatedEquipe = await Equipe.findByIdAndUpdate(equipeId, { name, players, logo }, { new: true });
        if (!updatedEquipe) {
            return res.status(404).json({ message: "Équipe non trouvée." });
        }

        res.status(200).json({ message: "Équipe mise à jour avec succès.", updatedEquipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEquipe = async (req, res) => {
    const { equipeId } = req.params;
    try {
        const equipe = await Equipe.findByIdAndDelete(equipeId);
        if (!equipe) {
            return res.status(404).json({ message: "Équipe non trouvée." });
        }
        res.status(200).json({ message: "Équipe supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEquipe,
    addPlayerToEquipe,
    getAllEquipes,
    getEquipeById,
    updateEquipe,
    deleteEquipe
};
