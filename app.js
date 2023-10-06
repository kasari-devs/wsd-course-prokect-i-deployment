import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as requestUtils from "./utils/requestUtils.js";
import * as listController from "./controllers/listController.js";
import * as listItemsController from "./controllers/listItemsController.js";
import * as mainPageController from "./controllers/mainPageController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL (request.url);
  if (url.pathname === "/" && request.method === "GET") {
    return await mainPageController.viewStatistics(request);
  } 
  else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  }
  else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewIndividualList(request);
  }
  else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await listItemsController.collectItem(request);
  }
  else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateThisList(request);
  }
  else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addNewList(request);
  }
  else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await listItemsController.addNewItem(request);
  }
  else {
    return new Response ("not found", {status: 404});
  }
};

serve(handleRequest, { port: 7777 });
