import mysql from "mysql2"

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "lernsets"
}).promise()

const result = await pool.query("SELECT * FROM NOTES")
const rows = result[0]