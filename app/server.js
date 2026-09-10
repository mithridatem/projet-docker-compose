import express from "express";
import { createClient } from "redis";

const app = express();

const redis = createClient({
    url: process.env.REDIS_URL
});

redis.on("error", (error) => {
    console.error("Erreur Redis :", error);
});

async function start() {

    // Connexion à Redis
    await redis.connect();

    console.log("Connexion à Redis réussie");

    // Endpoint compteur
    app.get("/api/visits", async (req, res) => {

        // Incrémente la clé "visits" et récupère sa nouvelle valeur
        const visits = await redis.incr("visits");

        res.json({
            visits: visits
        });
    });

    app.listen(4000, "0.0.0.0", () => {
        console.log("API disponible sur le port 4000");
    });
}

start();
