import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listItemsService from "../services/listItemsService.js" 

const responseDetails = {
    headers: {"Content-Type": "textThtml;charset=UTF-8"},
};

const addNewList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);
    return requestUtils.redirectTo("/lists");
}

const deactivateThisList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];
    await listService.deactivateList(listId);
    //console.log(`deativated list: ${listId}`);
    return requestUtils.redirectTo("/lists");
}
const viewLists = async (request) => {
    const data = {
        lists: await listService.viewAllNonCompletedTasks(),
    };
    return new Response(await renderFile("allLists.eta", data), responseDetails);
};
const viewIndividualList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
        items: await listItemsService.viewCurrentListItems(urlParts[2]),
        list: await listService.findById(urlParts[2]),
        
    }
    //console.log(`listController.js : ${JSON.stringify(data.items, null, 2)}`);
    return new Response(await renderFile("list.eta", data), responseDetails);
}
export {
    addNewList,
    viewLists,
    deactivateThisList,
    viewIndividualList,
}