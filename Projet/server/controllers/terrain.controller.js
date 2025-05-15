const Terrain = require("../models/terrain.js");

const createTerrain = async (req, res) => {
    const { name, location, price, availability, description, status , images } = req.body;
    try {
        const terrain = new Terrain({ name, location, price, availability, description, status , images });
        await terrain.save();
        res.status(201).json({ message: "Terrain créé avec succès.", terrain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTerrains = async (req, res) => {
    try {
        const terrains = await Terrain.find();
        res.status(200).json(terrains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTerrainById = async (req, res) => {
    const { terrainId } = req.params;
    try {
        const terrain = await Terrain.findById(terrainId);
        if (!terrain) {
            return res.status(404).json({ message: "Terrain non trouvé." });
        }
        res.status(200).json(terrain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTerrain = async (req, res) => {
    const { terrainId } = req.params;
    const { name, location, price, availability, description, status , images } = req.body;
    try {
        const updatedTerrain = await Terrain.findByIdAndUpdate(
            terrainId,
            { name, location, price, availability, description, status , images },
            { new: true }
        );
        if (!updatedTerrain) {
            return res.status(404).json({ message: "Terrain non trouvé." });
        }
        res.status(200).json({ message: "Terrain mis à jour avec succès.", updatedTerrain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTerrain = async (req, res) => {
    const { terrainId } = req.params;
    try {
        const terrain = await Terrain.findByIdAndDelete(terrainId);
        if (!terrain) {
            return res.status(404).json({ message: "Terrain non trouvé." });
        }
        res.status(200).json({ message: "Terrain supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTerrain,
    getAllTerrains,
    getTerrainById,
    updateTerrain,
    deleteTerrain
};
