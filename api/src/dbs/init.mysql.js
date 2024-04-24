import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const db = mysql.createConnection({
    host: DB_HOSTNAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'demodb',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

export default db;
