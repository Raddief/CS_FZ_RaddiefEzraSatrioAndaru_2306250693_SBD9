require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
});

const connect = async () => {
    try {
        await pool.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

connect();

const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error("Error executing query", error);
    }
}

const transaction = async (callback) => {
    let client;
    try {
        client = await pool.connect();
        await client.query("BEGIN");
        const result = await callback(client);
        await client.query("COMMIT");
        return result;
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Transaction Error:", err);
        throw err;
    } finally {
        if (client) client.release();
    }
};

module.exports = {
    query,
    transaction,
};