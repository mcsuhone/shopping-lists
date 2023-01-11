import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as utils from "../utils/requestUtils.js";
import * as shoppingItemService from "../services/shoppingItemService.js";
import * as shoppingListService from "../services/shoppingListService.js";



const getShoppingItems = async (request) => {
    const shopping_list_id = await utils.getIDFromRequest(request, 2);
    const itemData = {
        shopping_list: await shoppingListService.findShoppingList(shopping_list_id),
        items: await shoppingItemService.findAllShoppingItems(shopping_list_id),
    };
    return new Response(await renderFile("shoppinglist.eta", itemData), utils.responseDetails);
};

const addShoppingItem = async(request) => {
    const shopping_list_id = await utils.getIDFromRequest(request, 2);
    const formData = await request.formData();
    await shoppingItemService.createItem(formData.get("name"), shopping_list_id);
    return utils.redirectTo(`/lists/${shopping_list_id}`);
};

const collectShoppingItem = async(request) => {
    const shopping_list_id = await utils.getIDFromRequest(request, 2);
    const item_id = await utils.getIDFromRequest(request, 4);
    await shoppingItemService.collectItem(item_id);
    return utils.redirectTo(`/lists/${shopping_list_id}`)
};

export { addShoppingItem, getShoppingItems, collectShoppingItem };