import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as mainPageServices from "../services/mainPageServices.js";

const responseDetails = {
    headers: {"Content-Type": "textThtml;charset=UTF-8"},
};

const viewStatistics = async (request) => {
    const data = {
        listsCount: await mainPageServices.calculateSumOfLists(),
        itemsCount: await mainPageServices.calculateSumOfItems(),
    };
    return new Response (await renderFile ("mainpage.eta", data) , responseDetails);
};

export{ viewStatistics };