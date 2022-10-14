import { executeQuery } from "../database/database.js";

const create = async (sender, message) => {
  await executeQuery(
    "INSERT INTO messages (sender, message) VALUES ($sender, $message);",
    { sender: sender, message: message}
  );
};

const findAll = async () => {
  let result = await executeQuery(
    "SELECT * FROM messages ORDER BY id DESC LIMIT 5;"
  );
  return result.rows;
};

export { create, findAll };
