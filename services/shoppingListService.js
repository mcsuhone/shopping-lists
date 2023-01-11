import { sql } from "../database/database.js";

const createShoppingList = async (name) => {
  await sql
    `INSERT INTO shopping_lists (name) VALUES (${name});`;
};

const findAllShoppingLists = async () => {
  return await sql
    `SELECT * FROM shopping_lists;`;
};

const deactivateList = async (id) => {
  await sql
    `UPDATE shopping_lists SET active = FALSE WHERE id = ${id};`;
};

const findShoppingList = async (id) => {
  const result = await sql
    `SELECT * FROM shopping_lists WHERE id = ${id};`;
  if (result && result.length > 0) {
    return result[0];
  }
  return { id: 0, name: "Unknown"};
};

export { createShoppingList, findAllShoppingLists, deactivateList, findShoppingList };
