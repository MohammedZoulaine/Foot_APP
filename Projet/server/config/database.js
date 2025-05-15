const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/footballDB");
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Connexion à MongoDB échouée !', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
