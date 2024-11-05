import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const conn = mysql2.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

export default {
  async query(queryString = "", params = []) {
    const [rows] = await conn.execute(queryString, params);
    return rows;
  },
};
