const { loadEnvFile } = require("node:process");
loadEnvFile(".env");

const pool = require("./pool");

async function testConnection() {
    try{
        const result = await pool.query("SELECT NOW()");
        console.log("Conexion exitosa a PostgreSQL");
        console.log("Hora de PostgreSQL:", result.rows[0].now);
    } catch (error){
        console.error("Error conectando a PostgreSQL:", error.message);
    } finally {
        await pool.end()
    }
}

testConnection();