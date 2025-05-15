const express = require("express");
const { 
    createEquipe, 
    getAllEquipes, 
    getEquipeById, 
    updateEquipe, 
    deleteEquipe, 
    addPlayerToEquipe 
} = require("../controllers/equipe.controller.js");

const router = express.Router();

router.post("/", createEquipe);

router.post("/:equipeId/add-player", addPlayerToEquipe);

router.get("/", getAllEquipes);

router.get("/:equipeId", getEquipeById);

router.put("/:equipeId", updateEquipe);

router.delete("/:equipeId", deleteEquipe);

module.exports = router;
