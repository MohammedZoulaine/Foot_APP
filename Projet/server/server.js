const app = require("./app.js");
const connexion = require("./config/database.js");

const PORT = process.env.PORT || 5000;

connexion().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
});
