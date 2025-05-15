
db.users.drop();
db.equipes.drop();
db.terrains.drop();
db.reservations.drop();

// Génération des utilisateurs
const users = [];
for (let i = 1; i <= 20; i++) {
    users.push({
        name: `User${i}`,
        email: `user${i}@example.com`,
        password: `hashed_password${i}`,
        role: i % 2 === 0 ? "admin" : "user",
        phoneNumber: `06${Math.floor(10000000 + Math.random() * 89999999)}`,
        position: ["Gardien", "Défenseur", "Milieu", "Attaquant"][i % 4],
    });
}
const userIds = db.users.insertMany(users).insertedIds;

// Génération des terrains
const terrains = [];
for (let i = 1; i <= 20; i++) {
    terrains.push({
        name: `Terrain ${i}`,
        location: `Ville ${i}`,
        price: Math.floor(100 + Math.random() * 400),
        availability: ["10:00", "12:00", "14:00", "16:00", "18:00"],
        description: `Terrain de football numéro ${i}`,
        status: i % 3 === 0 ? "unavailable" : "available",
    });
}
const terrainIds = db.terrains.insertMany(terrains).insertedIds;

// Génération des équipes
const equipes = [];
for (let i = 1; i <= 20; i++) {
    equipes.push({
        name: `Equipe ${i}`,
        logo: `https://example.com/logos/equipe${i}.png`,
        owner: userIds[i % 20],
        players: [userIds[(i + 1) % 20], userIds[(i + 2) % 20], userIds[(i + 3) % 20]],
    });
}
const equipeIds = db.equipes.insertMany(equipes).insertedIds;

// Génération des réservations
const reservations = [];
for (let i = 1; i <= 20; i++) {
    reservations.push({
        user: userIds[i % 20],
        terrain: terrainIds[i % 20],
        date: new Date(`2024-04-${(i % 30) + 1}`),
        hour: ["10:00", "12:00", "14:00", "16:00", "18:00"][i % 5],
        status: ["pending", "confirmed", "cancelled"][i % 3],
    });
}
db.reservations.insertMany(reservations);

print("✅ Seeding terminé avec succès : 20 utilisateurs, 20 équipes, 20 terrains, 20 réservations !");
