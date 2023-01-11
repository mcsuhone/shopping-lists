import { executeQuery } from "../database/database.js";

const createShoppingList = async (name) => {
  await executeQuery (
    "INSERT INTO shopping_lists (name) VALUES ($name);",
    { name: name, }
  );
};

const findAllShoppingLists = async () => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists;"
  );
  return result.rows;
};

const deactivateList = async (id) => {
  await executeQuery(
    "UPDATE shopping_lists SET active = FALSE WHERE id = $id;",
    { id: id, }
  );
};

const findShoppingList = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE id = $id;",
    { id: id, }
  );
  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }
  return { id: 0, name: "Unknown"};
};

export { createShoppingList, findAllShoppingLists, deactivateList, findShoppingList };
