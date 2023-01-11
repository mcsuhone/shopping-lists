import { sql } from "../database/database.js";

const getShoppingListCount = async () => {
    const result = await sql
        `SELECT * FROM shopping_lists;`;
    return result.length;
};

const getShoppingItemCount = async () => {
    const result = await sql
        `SELECT * FROM shopping_list_items;`;
    return result.length;
};

export { getShoppingListCount, getShoppingItemCount };