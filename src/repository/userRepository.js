import conn from "../db/connection.js";
import { hashPassword } from "../utils/passwordHash.js";
import { v4 as generate_uuid } from "uuid";
import { hash } from "../utils/hash.js";

export default {
  signUp: async (email, name, pwd, phone_number) => {
    const uuid = generate_uuid();
    // const pwd = await hash(password);
    const res = await conn.query(
      `INSERT INTO
            Users(
                user_id,
                email,
                name,
                password,
                phone_number
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            );
            `,
      [uuid, email, name, pwd, phone_number],
    );
    return res;
  },
  findUserByEmailAndPwd: async (email, password) => {
    const res = await conn.query(
      `SELECT 
                    user_id 
                    FROM Users 
                    WHERE 
                    email = ?
                    AND
                    password = ?`,
      [email.toString(), password.toString()],
    );
    console.log(res);
    return res[0];
  },
  duplicateEmail: async (email) => {
    const res = await conn.query(
      `SELECT
                    user_id
                    FROM Users
                    WHERE
                    email = ?`,
      [email.toString()],
    );
    return res[0];
  },
  duplicatePhone: async (phone) => {
    const res = await conn.query(
      `SELECT
                    user_id
                    FROM Users
                    WHERE
                    phone_number = ?`,
      [phone.toString()],
    );
    return res[0];
  },
};
