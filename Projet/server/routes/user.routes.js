const express = require("express");
const {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    banUser,
    deleteUser
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:userId", getUserById); 
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.put("/:userId/ban", banUser);

module.exports = router;
