import { executeQuery } from "../database/database.js";

const createItem = async(name, shopping_list_id) => {
    await executeQuery(
        "INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name, $shopping_list_id);",
        { name: name, shopping_list_id: shopping_list_id, }
    );
};

const findAllShoppingItems = async(shopping_list_id) => {
    const result = await executeQuery(
        "SELECT * FROM shopping_list_items WHERE shopping_list_id = $shopping_list_id ORDER BY collected ASC, name;",
        { shopping_list_id: shopping_list_id, }
    );
    return result.rows;
};

const collectItem = async(item_id) => {
    await executeQuery(
        "UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;",
        { id: item_id, }
    );
};

export { createItem, findAllShoppingItems, collectItem };