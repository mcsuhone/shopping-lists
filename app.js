import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import * as starterPageController from "./controllers/starterPageController.js";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as shoppingItemController from "./controllers/shoppingItemController.js";

const handleRequest = (request) => {
  const url = new URL(request.url);

  // Shopping list logic
  if (request.method === "GET" && url.pathname === "/") {
    return starterPageController.getStarterPage();
  } else if (request.method === "GET" && url.pathname === "/lists") {
    return shoppingListController.getShoppingLists();
  } else if (request.method === "POST" && url.pathname === "/lists") {
    return shoppingListController.addShoppingList(request);
  } else if (
    request.method === "POST" && url.pathname.match("/lists/[0-9]+/deactivate")
  ) {
    return shoppingListController.deactivateShoppingList(request);
  } // Shopping item logic
  else if (request.method === "GET" && url.pathname.match("/lists/[0-9]+")) {
    return shoppingItemController.getShoppingItems(request);
  } else if (
    request.method === "POST" &&
    url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect")
  ) {
    return shoppingItemController.collectShoppingItem(request);
  } else if (
    request.method === "POST" && url.pathname.match("/lists/[0-9]+/items")
  ) {
    return shoppingItemController.addShoppingItem(request);
  }
  return new Response("Not found", { status: 404 });
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port: port });
