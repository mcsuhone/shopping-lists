import { sql } from "../database/database.js";

const createItem = async(name, shopping_list_id) => {
    await sql
        `INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${shopping_list_id});`;
};

const findAllShoppingItems = async(shopping_list_id) => {
    return await sql
        `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} ORDER BY collected ASC, name;`;
};

const collectItem = async(item_id) => {
    await sql
        `UPDATE shopping_list_items SET collected = TRUE WHERE id = ${item_id};`;
};

export { createItem, findAllShoppingItems, collectItem };