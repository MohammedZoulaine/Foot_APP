const express = require("express");
const { 
    createTerrain, 
    getAllTerrains, 
    getTerrainById, 
    updateTerrain, 
    deleteTerrain 
} = require("../controllers/terrain.controller.js");

const router = express.Router();

router.post("/", createTerrain);

router.get("/", getAllTerrains);

router.get("/:terrainId", getTerrainById);

router.put("/:terrainId", updateTerrain);

router.delete("/:terrainId", deleteTerrain);

module.exports = router;
