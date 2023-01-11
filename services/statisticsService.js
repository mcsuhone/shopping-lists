import { executeQuery } from "../database/database.js";

const getShoppingListCount = async () => {
    const result = await executeQuery(
        "SELECT COUNT(*) FROM shopping_lists;"
    );
    return result.rows[0].count;
};

const getShoppingItemCount = async () => {
    const result = await executeQuery(
        "SELECT COUNT(*) FROM shopping_list_items;"
    );
    return result.rows[0].count;
};

export { getShoppingListCount, getShoppingItemCount };