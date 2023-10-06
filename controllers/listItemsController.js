import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as listItemsService from "../services/listItemsService.js"
import * as requestUtils from "../utils/requestUtils.js"; 

const responseDetails = {
    headers: {"Content-Type": "textThtml;charset=UTF-8"},
};

const addNewItem = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const url = new URL (request.url);
    const urlParts = url.pathname.split("/");
    await listItemsService.createListItem(urlParts[2], name);
    //console.log(`listItemsController.js : listID: ${urlParts[2]}, name: ${name}`)
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
}
const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const itemId = urlParts[4];
    await listItemsService.collectItem(itemId);
    //console.log(`deativated item: ${itemId}`);
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
}

export {
    addNewItem,
    collectItem,
}