import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // or your MySQL password
    database: 'classicmodels',
});
app.get('/question1', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT COUNT(*) FROM customers WHERE country = 'France';");
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/question2', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT firstName, lastName FROM employees WHERE reportsTo = 1143;");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/question3', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) FROM products WHERE productLine = "Classic Cars";');
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// your endpoints here
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});