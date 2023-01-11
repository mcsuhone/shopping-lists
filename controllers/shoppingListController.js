import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as utils from "../utils/requestUtils.js";
import * as shoppingListService from "../services/shoppingListService.js";

const listData = {
    list: [],
};

const getStarterPage = async () => {
    return new Response(await renderFile("index.eta"), utils.responseDetails);
};

const getShoppingLists = async () => {
    listData.list = await shoppingListService.findAllShoppingLists();
    return new Response(await renderFile("shoppinglists.eta", listData), utils.responseDetails);
};

const addShoppingList = async (request) => {
    const formData = await request.formData();
    await shoppingListService.createShoppingList(formData.get("name"));
    return utils.redirectTo("/lists");
};

const deactivateShoppingList = async (request) => {
    const id = await utils.getIDFromRequest(request, 2);
    await shoppingListService.deactivateList(id);

    return utils.redirectTo("/lists");
};

export { getStarterPage, getShoppingLists, addShoppingList, deactivateShoppingList };