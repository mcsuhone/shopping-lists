import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as utils from "../utils/requestUtils.js";
import * as statisticsService from "../services/statisticsService.js";

const getStarterPage = async () => {
  const data = {
    shopping_list_count: await statisticsService.getShoppingListCount(),
    shopping_items_count: await statisticsService.getShoppingItemCount(),
  };

  return new Response(
    await renderFile("index.eta", data),
    utils.responseDetails,
  );
};

export { getStarterPage };
