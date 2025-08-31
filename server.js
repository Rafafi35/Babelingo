import express from "express";
import mysql from "mysql2";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lernsets"
}).promise();

app.get("/api/lernsets", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM lernsets");
        
        // Gruppiere die Daten nach lernsetName
        const groupedData = {};
        
        rows.forEach(row => {
            // lernsetName als Schlüssel verwenden
            const lernsetName = row.lernsetName; // Stellen Sie sicher, dass dieses Feld in Ihrer DB existiert
            
            // Sicherstellen, dass ein Array für dieses Lernset existiert
            if (!groupedData[lernsetName]) {
                groupedData[lernsetName] = [];
            }
            
            // Einzelnen Datensatz zum entsprechenden Lernset-Array hinzufügen
            groupedData[lernsetName].push({
                fremdSatz: row.fremdSatz,
                ersterTeil: row.ersterTeil,
                zweiterTeil: row.zweiterTeil,
                lösungswort: JSON.parse(row.lösungswort) // JSON-String in Array umwandeln
            });
        });
        
        res.json(groupedData);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});


app.listen(PORT, () => {
    console.log("Port: " + PORT);
});